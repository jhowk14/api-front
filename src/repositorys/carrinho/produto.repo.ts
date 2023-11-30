import { ApiError } from "../../helpers/erroHelper";
import prisma from "../../services/prisma";

export default class ProduroRepository {
    async getProduroRepo(id: number){
        try {
            const currentTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
            
            const task = await prisma.produtos.findMany({
                where:{
                    ProdClassificacao: 0,
                    ProdGrupo: id,
                    ProdHoraFinal: {
                        gte: currentTime,
                    },
                    ProdHoraInicial: {
                        lte: currentTime,
                    }
                },
                include:{
                    ValoresTipo: true,
                    Grupo: true
                }
            })
            console.log("Quero me matar!!!!!")
            return task;
        } catch (e) {
            throw new ApiError('Erro ao acessar os dados: ' + e, 401); 
        }
    }
    async getComplementosRepo(id: number){
        try {
            const currentTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
            
            const task = await prisma.produtos.findMany({
                where:{
                    ProdClassificacao: 3,
                    ProdGrupo: id,
                    ProdHoraFinal: {
                        gte: currentTime,
                    },
                    ProdHoraInicial: {
                        lte: currentTime,
                    }
                },
                include:{
                    ValoresTipo: true,
                    Grupo: true
                }
            })
            console.log(task)
            return task;
        } catch (e) {
            throw new ApiError('Erro ao acessar os dados: ' + e, 401); 
        }
    }
    
}