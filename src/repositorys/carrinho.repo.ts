import { Carrinho } from "@prisma/client";
import prisma from "../services/prisma";
import { ApiError } from "../helpers/erroHelper";
import CarrinhoItensRepository, { CarrinhoItensData } from "./carrinhoItens.repo";

const carrinhoItens = new CarrinhoItensRepository()
export type produto  = {
    Carrinho: Carrinho,
    produtos: CarrinhoItensData[]
}
export default class CarrinhoRepository {
    async createCarrinho(data: produto) {
        const token = await prisma.sessao.findUnique({
          where: { SesToken: data.Carrinho.CarSesToken }
        });
        if (token?.SesEmprCodigo != data.Carrinho.CarEmpresa) {
          throw new ApiError('Token inválido para a empresa', 401);
        }
    
        const carrinho = await prisma.carrinho.create({ data: data.Carrinho });
    
        // Crie um array de promessas para criar registros CarrinhoItens
        const createCarrinhoItensPromises = data.produtos.map(async (produtoData) => {
          return carrinhoItens.createCarrinhoItens({...produtoData, CarItensCarrrinhoID: carrinho.CarID });
        });
        // Execute todas as promessas em paralelo
        await Promise.all(createCarrinhoItensPromises);
    
        return carrinho;
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
    return prisma.carrinho.findMany({include: {
        CarrinhoItens: true,
    }});
  }
}

