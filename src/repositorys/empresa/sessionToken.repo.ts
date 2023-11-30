import { ApiError } from "../../helpers/erroHelper";
import prisma from "../../services/prisma";

   export async function  getSessionTokenRepo(CodigoEmpresa: number, sessionToken: string){
        try {
            const now = new Date()
            const hora = new Date(now.getTime() + 60 * 60 * 1000)
            const task = await prisma.sessao.create({
                data:{
                    SesToken: sessionToken,
                    SesEmprCodigo: CodigoEmpresa,
                    expiresAt: hora
                }
            })
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
    export async function deleteSessionTokenRepo() {
        return prisma.sessao.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        })
    }