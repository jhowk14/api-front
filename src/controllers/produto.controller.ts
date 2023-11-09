import { Request, Response } from 'express';
import ProduroRepository from '../repositorys/produto.repo';
import { redis } from '../services/redis';

const produroRepository = new ProduroRepository();

export async function getProduro(req: Request, res: Response) {
    try {
      const {id} = req.params
      const cacheKey = `produtos:${id}`;
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
              res.status(200).json(JSON.parse(cachedData));
      }else{
              const products = await produroRepository.getProduroRepo(parseInt(id));
              if(products){
                await redis.setex(cacheKey, 3600, JSON.stringify(products))
                res.status(200).json(products);
              }else{
                res.status(404).json({erro: 'nao encontrada'})
              }
      }
    } catch (e) {
      res.status(401).json({ error: 'Erro ao acessar os dados: ' + e});
    }
}
export async function getComplemento(req: Request, res: Response) {
  try {
    const {id} = req.params
    const cacheKey = `complemento:${id}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
            res.status(200).json(JSON.parse(cachedData));
    }else{
            const products = await produroRepository.getComplementosRepo(parseInt(id));
            if(products){
              await redis.setex(cacheKey, 3600, JSON.stringify(products))
              res.status(200).json(products);
            }else{
              res.status(404).json({erro: 'nao encontrada'})
            }
    }
  } catch (e) {
    res.status(401).json({ error: 'Erro ao acessar os dados: ' + e});
  }
}

