// PedidoItensRepository.ts
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../../services/prisma";

export type PedidoItens = {
  PedItensDescricao: string;
  PedItensValor: number;
  PedItensNome: string;
  PedidoID: number;
  prodID: number;
}

export default class PedidoItensRepository {
  async createPedidoItens(data: PedidoItens) {
    const pedidoItensResponse = await prisma.pedidoItens.create({ data })
    return {pedidoItensResponse, prodID: data.prodID}
  }
}
