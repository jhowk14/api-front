import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";

   export default async function  getSessionTokenRepo(CodigoEmpresa: number, sessionToken: string){
        try {
            const task = await prisma.sessao.create({
                data:{
                    SesToken: sessionToken,
                    SesEmprCodigo: CodigoEmpresa
                }
            })
            console.log(task)
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
