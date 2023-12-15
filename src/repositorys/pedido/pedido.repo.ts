import { Pedido, PedidoItem, PedidoItemComplemento } from "../../../types/pedidos";
import prisma from "../../services/prisma";
import PedidoComplementoRepository from "./pedidoComplemento.repo";
import PedidoItensRepository from "./pedidoItens.repo";

export type DataPedido = {
  Pedido: Pedido
  PedidoItens: PedidoItem[]
  PedidoComplementos: PedidoItemComplemento[]
}

export default class PedidoRepository {
  async createPedido(data: DataPedido) { 

    const pedido = await prisma.pedido.create({ data: data.Pedido })

    const pedidoItens = new PedidoItensRepository()
    const pedidoComplementoRepo = new PedidoComplementoRepository()

    const createPedidoItensPromises = data.PedidoItens.map(async (item) => {
      return pedidoItens.createPedidoItens({ ...item, pedidoId: pedido.id })
    });

    const pedidoItensResponses = await Promise.all(createPedidoItensPromises)

    const createPedidoComplementoPromises = data.PedidoComplementos.map(async (complemento) => {
      const pedido = pedidoItensResponses.find(a => a.prodID == complemento.prodID)?.pedidoItensResponse
      return pedidoComplementoRepo.createPedidoComplemento({ ...complemento, pedidoItemId: pedido?.id! })
    });

    await Promise.all(createPedidoComplementoPromises)

    return { pedido };
  }

  async getPedidoById(id: string) {
    const pedido = await prisma.pedido.findUnique({ where: { id }, include:{
        itens:{
          include:{
            complementos: true
          }
        }}});

    if (!pedido) {
      throw new Error(`Pedido com ID ${id} não encontrado.`);
    }

    return { pedido };
  }
  async updatePedido(id: string, data: DataPedido) {
    const pedido = await prisma.pedido.update({
      where: { id },
      data: { ...data.Pedido },
    });
    return { pedido };
  }
}
