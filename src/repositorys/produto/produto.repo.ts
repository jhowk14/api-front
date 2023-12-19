import { Produtos } from "@prisma/client";
import { ApiError } from "../../helpers/erroHelper";
import prisma from "../../services/prisma";

export default class ProduroRepository {
    async getProduroRepo(id: number){
        try {
            let currentTime = new Date()
            currentTime.setUTCHours(currentTime.getUTCHours() - 3);

            const task = await prisma.produtos.findMany({
                where:{
                    ProdClassificacao: 0,
                    ProdGrupo: id,
                },
                include:{
                    ValoresTipo: true,
                    Grupo: true
                }
            })
            return task;
        } catch (e) {
            console.log(e)
            throw new ApiError('Erro ao acessar os dados: ' + e, 401); 
        }
    }
    async getComplementosRepo(id: number){
        try {
            let currentTime = new Date()
            currentTime.setUTCHours(currentTime.getUTCHours() - 3);
            
            const task = await prisma.produtos.findMany({
                where:{
                    ProdClassificacao: 3,
                    ProdGrupo: id,
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
    async getProdutoById(id: number) {
        try {
            const produto = await prisma.produtos.findUnique({
                where: {
                    ProdID: id,
                },
                include: {
                    ValoresTipo: true,
                    Grupo: true
                }
            });
            return produto;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401); 
        }
    }

    // Cria um novo produto
    async createProduto(data: Produtos) {
        try {
            const novoProduto = await prisma.produtos.create({
                data,
            });
            return novoProduto;
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            throw new ApiError('Erro ao criar produto', 500);
        }
    }

    // Atualiza um produto existente
    async updateProduto(id: number, data: { /* Campos a serem atualizados */ }) {
        try {
            const produtoAtualizado = await prisma.produtos.update({
                where: {
                    ProdID: id,
                },
                data,
            });
            return produtoAtualizado;
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw new ApiError('Erro ao atualizar produto', 500);
        }
    }

    // Exclui um produto
    async deleteProduto(id: number) {
        try {
            const produtoExcluido = await prisma.produtos.delete({
                where: {
                    ProdID: id,
                },
            });
            return produtoExcluido;
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            throw new ApiError('Erro ao excluir produto', 500);
        }
    }
}