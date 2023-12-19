import { ProdutoValoresTipo } from "@prisma/client";
import { ApiError } from "../../helpers/erroHelper";
import prisma from "../../services/prisma";

export default class ProdutoValoresTipoRepository {
    async getAllProdutoValoresTipos() {
        try {
            const produtoValoresTipos = await prisma.produtoValoresTipo.findMany();
            return produtoValoresTipos;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401);
        }
    }

    async getProdutoValoresTipoById(id: number) {
        try {
            const produtoValoresTipo = await prisma.produtoValoresTipo.findUnique({
                where: {
                    PrVtID: id,
                },
            });
            return produtoValoresTipo;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401);
        }
    }

    async createProdutoValoresTipo(data: ProdutoValoresTipo) {
        try {
            const novoProdutoValoresTipo = await prisma.produtoValoresTipo.create({
                data,
            });
            return novoProdutoValoresTipo;
        } catch (error) {
            console.error("Erro ao criar ProdutoValoresTipo:", error);
            throw new ApiError('Erro ao criar ProdutoValoresTipo', 500);
        }
    }

    async updateProdutoValoresTipo(id: number, data: ProdutoValoresTipo) {
        try {
            const produtoValoresTipoAtualizado = await prisma.produtoValoresTipo.update({
                where: {
                    PrVtID: id,
                },
                data,
            });
            return produtoValoresTipoAtualizado;
        } catch (error) {
            console.error("Erro ao atualizar ProdutoValoresTipo:", error);
            throw new ApiError('Erro ao atualizar ProdutoValoresTipo', 500);
        }
    }

    async deleteProdutoValoresTipo(id: number) {
        try {
            const produtoValoresTipoExcluido = await prisma.produtoValoresTipo.delete({
                where: {
                    PrVtID: id,
                },
            });
            return produtoValoresTipoExcluido;
        } catch (error) {
            console.error("Erro ao excluir ProdutoValoresTipo:", error);
            throw new ApiError('Erro ao excluir ProdutoValoresTipo', 500);
        }
    }
}
