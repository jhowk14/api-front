import { Carrinho } from "@prisma/client";
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

    const complementos = data.produtos.filter((c) => c.ProdClassificacao === 0);

    const createCarrinhoItensPromises = data.produtos.map(async (p) => {
      const total = complementos
        .filter((c) => c.produtoId === p.ProdID)
        .reduce((a, b) => a + b.ProdValor * b.quantidade, 0);

      const carrinhoItemData = {
        CarItensAgrupamento: p.Grupo.GrupDescricao,
        CarItensCarrrinhoID: carrinho.CarID,
        CarItensComplemento: complementos.length,
        CarItensObservacoes: p.observacoes || '',
        CarItensProdID: p.ProdID,
        CarItensQuantidade: p.quantidade,
        CarItensValorProdutos: (p.ProdValor + total)*1,
        CarItensValorTotalGeral: (p.ProdValor * p.quantidade + total)*1,
        CarItensValorUnitario: (p.ProdValor)*1
      };

     const carrinhoItensResponse = await carrinhoItens.createCarrinhoItens(carrinhoItemData);

     if (p.ProdClassificacao === 3) {
      await complementoRepo.createComplementoRepo({
        CompCarID: carrinhoItensResponse.CarItensID,
        CompProdID: p.ProdID,
        CompQuantidade: p.quantidade
      });
    }

    });

    await Promise.all(createCarrinhoItensPromises);

    return { carrinho };
  }

  async getCarrinhoById(id: string) {
    return prisma.carrinho.findMany({ where: { CarSesToken: id },include: {
        CarrinhoItens: true
    } });
  }

  async updateCarrinho(id: number, data: Partial<Carrinho>) {
    return prisma.carrinho.update({ where: { CarID: id }, data });
  }

  async deleteCarrinho(id: number) {
    return prisma.carrinho.delete({ where: { CarID: id } });
  }

  async listCarrinhos() {
    return prisma.carrinho.findMany({
      include: {
        CarrinhoItens: true,
    }});
  }
}

