import { Request, Response } from 'express';
import { UpdateCarrinhoRepo } from '../../repositorys/carrinho/updateCarrinho.repo';

export async function UpdateCarrinho(req: Request, res: Response) {
  try {
    const data = req.body;
    const carrinho = await UpdateCarrinhoRepo(data.carrinho, data.qtd, data.carrinhoItens)
    res.json(carrinho);
  } catch (error) {
    res.status(401).json({ error: 'Failed to create carrinho '+error });
  }
}
