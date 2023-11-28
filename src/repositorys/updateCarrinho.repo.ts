import { Carrinho, CarrinhoItens } from "@prisma/client";
import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";

   export async function UpdateCarrinhoRepo(carrinho: {CarID: number, CarValorTotal: number}, qtd: number | null, data: Partial<CarrinhoItens> = {}){
        try {
            var UpdadeCarrinho
            var UpdateCarrinhoItens
            if(qtd){
                UpdadeCarrinho = await prisma.carrinho.update({
                    where: {
                        CarID: carrinho.CarID
                    },data:{
                         CarQtd: qtd,
                    }
                })
            }else{
                UpdadeCarrinho = await prisma.carrinho.update({
                    where: {
                        CarID: carrinho.CarID
                    },data:{
                         CarValorTotal: carrinho.CarValorTotal
                    }
                })
            }
            if(Object.keys(data).length > 0){
                UpdateCarrinhoItens = await prisma.carrinhoItens.update({
                    where: {
                        CarItensID: data.CarItensID
                    },data:{
                        ...data
                    }
                })
            }
            return {UpdadeCarrinho, UpdateCarrinhoItens}
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
  