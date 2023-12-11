import { Request, Response } from "express";
import PedidoRepository from "../../repositorys/pedido/pedido.repo";


const pedidoRepository = new PedidoRepository();

export async function createpedido(req: Request, res: Response) {
  try {
    const data = req.body;
    const pedido = await pedidoRepository.createPedido(data);
    res.json(pedido);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Failed to create pedido '+error });
  }
}