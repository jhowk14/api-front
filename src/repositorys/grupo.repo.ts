import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";

export default class GrupoRepository {
    async getGrupoRepo(id: number){
        try {
            const task = await prisma.grupos.findMany({
                where:{
                    GrupEmpresa: id,

                },include:{
                    Empresa: true,
                    GrupoTipo: true,
                    Produtos:true 
                }
            })
            console.log(task)
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
    
}