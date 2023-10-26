import { Request, Response } from 'express';
import ProduroRepository from '../repositorys/produto.repo';

const produroRepository = new ProduroRepository();

export default async function getProduro(req: Request, res: Response) {
    try {
        const {id} = req.params
      const products = await produroRepository.getProduroRepo(parseInt(id));
      res.json(products);
    } catch (e) {
      res.status(401).json({ error: 'Erro ao acessar os dados: ' + e});
    }
  }

