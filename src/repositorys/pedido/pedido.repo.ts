import prisma from "../../services/prisma";
import PedidoComplementoRepository, { PedidoComplementos } from "./pedidoComplemento.repo";
import PedidoItensRepository, { PedidoItens } from "./pedidoItens.repo";

type Pedidos = {
  PedidoID: number
  EmpresaID: string
  PedidoData: Date
  PedidoTotal: number
  PedidoCliNome: string
  PedidoCliEndereco: string
  PedidoCliTelefone: string
  PedidoCliMetodo: string
}

export type DataPedido = {
  Pedido: Pedidos
  PedidoItens: PedidoItens[]
  PedidoComplementos: PedidoComplementos[]
}

export default class PedidoRepository {
  async createPedido(data: DataPedido) { 

    const pedido = await prisma.pedidos.create({ data: data.Pedido })

    const pedidoItens = new PedidoItensRepository()
    const pedidoComplementoRepo = new PedidoComplementoRepository()

    const createPedidoItensPromises = data.PedidoItens.map(async (item) => {
      return pedidoItens.createPedidoItens({ ...item, PedidoID: pedido.PedidoID })
    });

    const pedidoItensResponses = await Promise.all(createPedidoItensPromises)

    const createPedidoComplementoPromises = data.PedidoComplementos.map(async (complemento) => {
      const pedido = pedidoItensResponses.find(a => a.prodID == complemento.prodID)?.pedidoItensResponse
      return pedidoComplementoRepo.createPedidoComplemento({ ...complemento, PedItensID: pedido?.PedItensID!})
    });

    await Promise.all(createPedidoComplementoPromises)
    return { pedido };
  }
}
