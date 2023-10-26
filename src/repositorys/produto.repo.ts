import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";

export default class ProduroRepository {
    async getProduroRepo(id: number){
        try {
            const task = await prisma.produtos.findMany({
                where:{
                    ProdClassificacao: 0,
                    ProdGrupo: id,
                },include:{
                    ValoresTipo: true
                }
            })
            console.log(task)
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
    
}