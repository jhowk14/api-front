import { PedidoItem } from "../../../types/pedidos";
import prisma from "../../services/prisma";

export default class PedidoItensRepository {
  async createPedidoItens(data: PedidoItem) {
    const pedidoItensResponse = await prisma.pedidoItem.create({data:{
        agrupamento: data.agrupamento,
        nomeAgrupamento: data.nomeAgrupamento,
        quantidadeAgrupamento: data.quantidadeAgrupamento,
        observacoes: data.observacoes,
        grupoTipo: data.grupoTipo,
        produto: data.produto,
        quantidade: data.quantidade,
        totalComplementos: data.totalComplementos,
        valorProduto: data.valorProduto,
        valorTotal: data.valorTotal,
        valorUnitario: data.valorUnitario,
        pedidoId: data.pedidoId
    }})
    return {pedidoItensResponse, prodID: data.prodID}
  }
}
