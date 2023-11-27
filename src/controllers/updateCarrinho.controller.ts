import { Request, Response } from 'express';
import { UpdateCarrinho } from '../repositorys/updateCarrinho.repo';

async function createCarrinho(req: Request, res: Response) {
  try {
    const data = req.body;
    const carrinho = await UpdateCarrinho(1, data)
    res.json(carrinho);
  } catch (error) {
    res.status(401).json({ error: 'Failed to create carrinho '+error });
  }
}
