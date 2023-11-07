import { Complemento } from "../../types/complemento";
import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";

export default class ComplementoRepository {
    async createComplementoRepo(complemento: Partial<Complemento>){
        try {
            const task = await prisma.complemento.create({
                data:{
                    CompCarID: complemento.CompCarID!,
                    CompProdID: complemento.CompProdID!,
                    CompQuantidade: complemento.CompQuantidade!
                }
            })

            console.log(task)
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
}