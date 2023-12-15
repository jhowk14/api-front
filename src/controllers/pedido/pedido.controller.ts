import { Request, Response } from "express";
import PedidoRepository, { DataPedido } from "../../repositorys/pedido/pedido.repo";

const pedidoRepository = new PedidoRepository();

export async function createPedido(req: Request, res: Response) {
  try {
    const data = req.body;
    const pedido = await pedidoRepository.createPedido(data);
    res.json(pedido);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Failed to create pedido '+error });
  }
}
export const getPedidoById = async (req: Request, res: Response) => {
  try {
    const pedidoId = req.params.id
    const pedido = await pedidoRepository.getPedidoById(pedidoId);

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error });
  }

};
export const updatePedido = async(req: Request, res: Response) =>{
  const { id } = req.params;
  const data = req.body;
  try {
    const pedido = await pedidoRepository.updatePedido(id, data);
    res.status(200).json(pedido);
  } catch (error) {
    console.error('Erro ao atualizar o pedido:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar o pedido' });
  }
}