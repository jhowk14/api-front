import prisma from "../../services/prisma";

export type PedidoComplementos = {
  PedComNome: string;
  PedComQtd: number;
  prodID: number;
  PedItensID: number;
}

export default class PedidoComplementoRepository {
  async createPedidoComplemento(data: PedidoComplementos) {
    return prisma.pedidoComplementos.create({ data });
  }

}
