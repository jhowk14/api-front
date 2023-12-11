import { PedidoItemComplemento } from "../../../types/pedidos";
import prisma from "../../services/prisma";

export default class PedidoComplementoRepository {
  async createPedidoComplemento(data: PedidoItemComplemento) {
    return prisma.pedidoItemComplemento.create({
      data: {
        produtoComplemento: data.produtoComplemento,
        quantidadeComplemento: data.quantidadeComplemento,
        valorTotalComplemento: data.valorTotalComplemento,
        valorUnitarioComplemento: data.valorUnitarioComplemento,
        pedidoItemId: data.pedidoItemId
      }
    })
}
}
