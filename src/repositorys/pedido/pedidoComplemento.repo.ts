// PedidoComplementoRepository.ts
import { PedidoComplementos } from "@prisma/client";
import prisma from "../../services/prisma";

export default class PedidoComplementoRepository {
  async createPedidoComplemento(data: PedidoComplementos) {
    return prisma.pedidoComplementos.create({ data });
  }

}
