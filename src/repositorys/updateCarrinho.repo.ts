import { Carrinho } from "@prisma/client";
import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";

   export async function UpdateCarrinho(CarID: number, data: Carrinho){
        try {
            const task = await prisma.carrinho.update({
                where: {
                    CarID
                },data
            })
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
  