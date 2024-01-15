import { GrupoTipo } from "@prisma/client";
import { ApiError } from "../../helpers/erroHelper";
import prisma from "../../services/prisma";

export default class GrupoTipoRepository {
    async getAllGrupoTipos() {
        try {
            const grupoTipos = await prisma.grupoTipo.findMany();
            return grupoTipos;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401);
        }
    }

    async getGrupoTipoById(id: number) {
        try {
            const grupoTipo = await prisma.grupoTipo.findUnique({
                where: {
                    GrTpID: id,
                },
            });
            return grupoTipo;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401);
        }
    }
    async getGrupoTipoByGrupo(id: number) {
        try {
            const grupoTipo = await prisma.grupoTipo.findMany({
                where: {
                    Grupo:{
                        GrupEmpresa: id
                    }
                },
            });
            return grupoTipo;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 401);
        }
    }
    async createGrupoTipo(data: GrupoTipo) {
        try {
            const novoGrupoTipo = await prisma.grupoTipo.create({
                data,
            });
            return novoGrupoTipo;
        } catch (error) {
            console.error("Erro ao criar GrupoTipo:", error);
            throw new ApiError('Erro ao criar GrupoTipo', 500);
        }
    }

    async updateGrupoTipo(id: number, data: GrupoTipo) {
        try {
            const grupoTipoAtualizado = await prisma.grupoTipo.update({
                where: {
                    GrTpID: id,
                },
                data,
            });
            return grupoTipoAtualizado;
        } catch (error) {
            console.error("Erro ao atualizar GrupoTipo:", error);
            throw new ApiError('Erro ao atualizar GrupoTipo', 500);
        }
    }

    async deleteGrupoTipo(id: number) {
        try {
            const grupoTipoExcluido = await prisma.grupoTipo.delete({
                where: {
                    GrTpID: id,
                },
            });
            return grupoTipoExcluido;
        } catch (error) {
            console.error("Erro ao excluir GrupoTipo:", error);
            throw new ApiError('Erro ao excluir GrupoTipo', 500);
        }
    }
}
