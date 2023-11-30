import { Request, Response } from 'express';
import CarrinhoItensRepository from '../../repositorys/carrinho/carrinhoItens.repo';

const carrinhoItensRepository = new CarrinhoItensRepository();

async function deleteCarrinhoItens(req: Request, res: Response){
    try {
        const { id } = req.params;
        await carrinhoItensRepository.deleteCarrinhoItens(parseInt(id));
        res.json({ message: 'Carrinho deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete carrinho: '+error });
      }
}

async function atualizarCarrinho(req: Request, res: Response){
  try {
    const { id } = req.params;
    const d = req.body;
    await carrinhoItensRepository.updateCarrinhoItens(parseInt(id), d);
    res.json({ message: 'Carrinho atualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update carrinho: '+error });
  }
}

export {deleteCarrinhoItens, atualizarCarrinho}