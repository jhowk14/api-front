import { Request, Response } from 'express';
import CarrinhoRepository from '../repositorys/carrinho.repo';

const carrinhoRepository = new CarrinhoRepository();

async function createCarrinho(req: Request, res: Response) {
  try {
    const data = req.body;
    const carrinho = await carrinhoRepository.createCarrinho(data);
    res.json(carrinho);
  } catch (error) {
    res.status(401).json({ error: 'Failed to create carrinho '+error });
  }
}

async function getCarrinho(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const carrinho = await carrinhoRepository.getCarrinhoById(id);
    if (carrinho) {
      res.json(carrinho);
    } else {
      res.status(404).json({ error: 'Carrinho not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch carrinho' });
  }
}

async function updateCarrinho(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedCarrinho = await carrinhoRepository.updateCarrinho(parseInt(id, 10), data);
    if (updatedCarrinho) {
      res.json(updatedCarrinho);
    } else {
      res.status(404).json({ error: 'Carrinho not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update carrinho' });
  }
}

async function deleteCarrinho(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await carrinhoRepository.deleteCarrinho(parseInt(id, 10));
    res.json({ message: 'Carrinho deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete carrinho' });
  }
}

async function listCarrinhos(req: Request, res: Response) {
  try {
    const carrinhos = await carrinhoRepository.listCarrinhos();
    res.json(carrinhos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch carrinhos' });
  }
}

export { createCarrinho, getCarrinho, updateCarrinho, deleteCarrinho, listCarrinhos };
