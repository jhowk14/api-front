import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";

export default class EmpresaRepository {
    async getEmpreseRepo(id: string){
        try {
            const task = await prisma.empresas.findUnique({
                where:{
                    EmprLink: id
                }
            })
            console.log(task)
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
    
}