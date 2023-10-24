import prisma from "../services/prisma";
import { z } from 'zod';

export const createCarrinhoItensSchema = z.object({
    CarItensCarrrinhoID: z.number(),
    CarItensProdID: z.number(),
    CarItensQuantidade: z.number(),
    CarItensValorUnitario: z.number(),
    CarItensValorProdutos: z.number(),
    CarItensObservacoes: z.string(),
    CarItensComplemento: z.number(),
    CarItensValorTotalGeral: z.number(),
    CarItensAgrupamento: z.string(),
});

export type CarrinhoItensData = z.infer<typeof createCarrinhoItensSchema>;

export default class CarrinhoItensRepository {
    async createCarrinhoItens(data: CarrinhoItensData) {
        try {
            const carrinhoItensData = createCarrinhoItensSchema.parse(data);

            const carrinhoItens = await prisma.carrinhoItens.create({
                data: {
                    CarItensCarrrinhoID: carrinhoItensData.CarItensCarrrinhoID,
                    CarItensProdID: carrinhoItensData.CarItensProdID,
                    CarItensQuantidade: carrinhoItensData.CarItensQuantidade,
                    CarItensValorUnitario: carrinhoItensData.CarItensValorUnitario,
                    CarItensValorProdutos: carrinhoItensData.CarItensValorProdutos,
                    CarItensObservacoes: carrinhoItensData.CarItensObservacoes,
                    CarItensComplemento: carrinhoItensData.CarItensComplemento,
                    CarItensValorTotalGeral: carrinhoItensData.CarItensValorTotalGeral,
                    CarItensAgrupamento: carrinhoItensData.CarItensAgrupamento,
                }
            });

            return { carrinhoItens };
        } catch (e) {
            throw e;
        }
    }

    async getCarrinhoItensById(id: number) {
        try {
            return await prisma.carrinhoItens.findUnique({
                where: {
                    CarItensID: id
                },
                include: {
                    Carrinho: true,
                    Produto: true
                }
            });
        } catch (e) {
            throw e;
        }
    }

    async updateCarrinhoItens(id: number, data: Partial<CarrinhoItensData>) {
        try {
            await prisma.carrinhoItens.update({
                where: {
                    CarItensID: id
                },
                data: {
                    ...data
                }
            });

            return await this.getCarrinhoItensById(id);
        } catch (e) {
            throw e;
        }
    }

    async deleteCarrinhoItens(id: number) {
        try {
            await prisma.carrinhoItens.delete({
                where: {
                    CarItensID: id
                }
            });
        } catch (e) {
            throw e;
        }
    }
}
