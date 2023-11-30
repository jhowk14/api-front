import { PedidoItens } from "@prisma/client";
import { ApiError } from "../../helpers/erroHelper"; // Importe ApiError
import prisma from "../../services/prisma";
import PedidoComplementoRepository from "./pedidoComplemento.repo";
import PedidoItensRepository from "./pedidoItens.repo";

export default class PedidoRepository {
  async createPedido(data: any) { 
    const token = await prisma.sessao.findUnique({
      where: { SesToken: data.carrinho.CarSesToken }
    });

    if (token?.SesEmprCodigo !== data.carrinho.CarEmpresa) {
      throw new ApiError('Token inválido para a empresa', 401);
    }

    const pedido = await prisma.pedidos.create({ data });

    const pedidoItens = new PedidoItensRepository();
    const pedidoComplementoRepo = new PedidoComplementoRepository();

    const complementos = data.produtos.filter((c: any) => c.ProdClassificacao === 3);

    const pedidoItensResponses: PedidoItens[] = [];
    const createPedidoItensPromises = data.produtos.map(async (p: any) => {
      const total = complementos
        .filter((c: any) => c.produtoId === p.ProdID)
        .reduce((a: any, b: any) => a + b.ProdValor * b.quantidade, 0);

      const pedidoItemData = {
        PedItensDescricao: p.Grupo.GrupDescricao,
        PedItensValor:1,
        PedItensNome: p.ProdNome,
        PedidoID: pedido.PedidoID,
        /* outros campos necessários para PedidoItens */
      };

      const pedidoItemResponse = await pedidoItens.createPedidoItens(data);
      pedidoItensResponses.push(pedidoItemResponse);
    });

    await Promise.all(createPedidoItensPromises);

    const complementoPromise = data.produtos.map(async (s: any) => {
      if (s.ProdClassificacao === 3) {
        let b = pedidoItensResponses.find((a: any) => a.PedItensProdID == s.produtoId);
        await pedidoComplementoRepo.createPedidoComplemento(data);
      }
    });

    await Promise.all(complementoPromise);

    return { pedido };
  }
}
