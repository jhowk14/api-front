import { Grupos } from "@prisma/client";
import { ApiError } from "../../helpers/erroHelper";
import prisma from "../../services/prisma";

export default class GrupoRepository {
    // Obtém todos os grupos de uma empresa
    async getGruposByEmpresa(id: number) {
        try {
            const grupos = await prisma.grupos.findMany({
                where: {
                    GrupEmpresa: id,
                },
                include: {
                    GrupoTipo: true,
                },
            });
            return grupos;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401);
        }
    }

    // Obtém um grupo específico pelo ID
    async getGrupoById(id: number) {
        try {
            const grupo = await prisma.grupos.findUnique({
                where: {
                    GrupID: id,
                },
                include: {
                    Empresa: true,
                    GrupoTipo: true,
                },
            });
            return grupo;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401);
        }
    }

    // Cria um novo grupo
    async createGrupo(data: Grupos) {
        try {
            const novoGrupo = await prisma.grupos.create({
                data,
            });
            return novoGrupo;
        } catch (error) {
            console.error("Erro ao criar grupo:", error);
            throw new ApiError('Erro ao criar grupo', 500);
        }
    }

    // Atualiza um grupo existente
    async updateGrupo(id: number, data: Partial<Grupos>) {
        try {
            const grupoAtualizado = await prisma.grupos.update({
                where: {
                    GrupID: id,
                },
                data,
            });
            return grupoAtualizado;
        } catch (error) {
            console.error("Erro ao atualizar grupo:", error);
            throw new ApiError('Erro ao atualizar grupo', 500);
        }
    }

    // Exclui um grupo
    async deleteGrupo(id: number) {
        try {
            const grupoExcluido = await prisma.grupos.delete({
                where: {
                    GrupID: id,
                },
            });
            return grupoExcluido;
        } catch (error) {
            console.error("Erro ao excluir grupo:", error);
            throw new ApiError('Erro ao excluir grupo', 500);
        }
    }
}
