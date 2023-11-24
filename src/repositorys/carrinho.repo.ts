import { Carrinho, CarrinhoItens } from "@prisma/client";
import prisma from "../services/prisma";
import { ApiError } from "../helpers/erroHelper";
import CarrinhoItensRepository, { CarrinhoItensData } from "./carrinhoItens.repo";
import ComplementoRepository from "./complemento.repo";
import { Produto } from "../../types/Produto";

export type produtos  = {
    carrinho: Carrinho,
    produtos: Produto[]
}

export default class CarrinhoRepository {
  async createCarrinho(data: produtos) {
    const token = await prisma.sessao.findUnique({
      where: { SesToken: data.carrinho.CarSesToken }
    });
    console.log(data)
    if (token?.SesEmprCodigo !== data.carrinho.CarEmpresa) {
      throw new ApiError('Token inválido para a empresa', 401);
    }

    const carrinho = await prisma.carrinho.create({ data: data.carrinho });

    const carrinhoItens = new CarrinhoItensRepository();
    const complementoRepo = new ComplementoRepository();

    const complementos = data.produtos.filter((c) => c.ProdClassificacao === 3);

    const carrinhoItensResponses: CarrinhoItens[] = [];
    const createCarrinhoItensPromises = data.produtos.map(async (p) => {
      const total = complementos
        .filter((c) => c.produtoId === p.ProdID)
        .reduce((a, b) => a + b.ProdValor * b.quantidade, 0);

      const carrinhoItemData = {
        CarItensAgrupamento: p.Grupo.GrupDescricao,
        CarItensCarrrinhoID: carrinho.CarID,
        CarItensComplemento: total*1,
        CarItensObservacoes: p.observacoes || '',
        CarItensProdID: p.ProdID,
        CarItensQuantidade: p.quantidade,
        CarItensValorProdutos: (p.ProdValor*1) + (total*1),
        CarItensValorTotalGeral: (p.ProdValor*1) * (p.quantidade*1) + (total*1),
        CarItensValorUnitario: p.ProdValor*1
      };

     const carrinhoItensResponse = await carrinhoItens.createCarrinhoItens(carrinhoItemData);
     carrinhoItensResponses.push(carrinhoItensResponse);
    });

  await Promise.all(createCarrinhoItensPromises);

   const complementoPromise = data.produtos.map(async(s)=>{
     if(s.ProdClassificacao === 3){
        let b = carrinhoItensResponses.find(a => a.CarItensProdID == s.produtoId)
        await complementoRepo.createComplementoRepo({
          CompCarID: b?.CarItensID,
          CompProdID: s.ProdID,
          CompQuantidade: s.quantidade
        });
      }
    })

  await Promise.all(complementoPromise);

    return { carrinho };
  }

  async createCarrinhoID(data: produtos, id: string) {
    const token = await prisma.sessao.findUnique({
      where: { SesToken: data.carrinho.CarSesToken }
    });
    console.log(data)
    if (token?.SesEmprCodigo !== data.carrinho.CarEmpresa) {
      throw new ApiError('Token inválido para a empresa', 401);
    }

    const carrinhoItens = new CarrinhoItensRepository();
    const complementoRepo = new ComplementoRepository();

    const complementos = data.produtos.filter((c) => c.ProdClassificacao === 3);

    const carrinhoItensResponses: CarrinhoItens[] = [];
    const createCarrinhoItensPromises = data.produtos.map(async (p) => {
      const total = complementos
        .filter((c) => c.produtoId === p.ProdID)
        .reduce((a, b) => a + b.ProdValor * b.quantidade, 0);

      const carrinhoItemData = {
        CarItensAgrupamento: p.Grupo.GrupDescricao,
        CarItensCarrrinhoID: parseInt(id),
        CarItensComplemento: total*1,
        CarItensObservacoes: p.observacoes || '',
        CarItensProdID: p.ProdID,
        CarItensQuantidade: p.quantidade,
        CarItensValorProdutos: (p.ProdValor*1) + (total*1),
        CarItensValorTotalGeral: (p.ProdValor*1) * (p.quantidade*1) + (total*1),
        CarItensValorUnitario: p.ProdValor*1
      };

     const carrinhoItensResponse = await carrinhoItens.createCarrinhoItens(carrinhoItemData);
     carrinhoItensResponses.push(carrinhoItensResponse);
    });

   const complementoPromise = data.produtos.map(async(s)=>{
      if(s.ProdClassificacao === 3){
        console.log(s.produtoId)
        let b = carrinhoItensResponses.find(a => a.CarItensProdID == s.produtoId)
        await complementoRepo.createComplementoRepo({
          CompCarID: b?.CarItensID,
          CompProdID: s.ProdID,
          CompQuantidade: s.quantidade
        });
      }
    })

    return await Promise.all([createCarrinhoItensPromises, complementoPromise]);
  }

  async getCarrinhoById(id: string) {
    return prisma.carrinho.findMany({ where: { CarSesToken: id },include: {
        CarrinhoItens: {
          include: {
            Produto: {
              include:{
                Grupo: {
                  include: {
                    GrupoTipo: true
                  }
                }
              }
            },
            Complemento: {
              include:{
                Produto: true
              }
            }
          }
        }
    } });
  }

  async updateCarrinho(id: number, data: Partial<Carrinho>) {
    return prisma.carrinho.update({ where: { CarID: id }, data });
  }

  async deleteCarrinhoToken(id: string) {
    return prisma.carrinho.deleteMany({ where: { CarSesToken: id } });
  }

  async deleteCarrinho(id: number) {
    return prisma.carrinho.delete({ where: {  CarID: id } });
  }

  async listCarrinhos() {
    return prisma.carrinho.findMany({
      include: {
        CarrinhoItens: true,
    }});
  }
}

