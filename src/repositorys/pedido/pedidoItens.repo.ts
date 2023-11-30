// PedidoItensRepository.ts
import { PedidoItens } from "@prisma/client";
import prisma from "../../services/prisma";

export default class PedidoItensRepository {
  async createPedidoItens(data: PedidoItens) {
    return prisma.pedidoItens.create({ data });
  }

}
