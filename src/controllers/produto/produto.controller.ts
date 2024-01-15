import { Request, Response } from 'express';
import ProduroRepository from '../../repositorys/produto/produto.repo';
import { redis } from '../../services/redis';

const produroRepository = new ProduroRepository();

export async function getProduro(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const cacheKey = `produroID:${id}:${req.userId}`;
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            res.status(200).json(JSON.parse(cachedData));
        } else {
            const products = await produroRepository.getProduroRepo(parseInt(id));
            if (products) {
                await redis.setex(cacheKey, 3600, JSON.stringify(products));
                res.status(200).json(products);
            } else {
                res.status(404).json({ erro: 'Produto não encontrado' });
            }
        }
    } catch (e) {
        res.status(401).json({ error: 'Erro ao acessar os dados: ' + e });
    }
}
export async function getProduroByEmpresa(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if(req.user.adm){

            const products = await produroRepository.getProduroByEmpresaRepo(parseInt(id));
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(404).json({ erro: 'Produto não encontrado' });
            }
        }else{

                res.status(401).json({ erro: 'não autorizado' });
        }
        
    } catch (e) {
        res.status(401).json({ error: 'Erro ao acessar os dados: ' + e });
    }
}

export async function getComplemento(req: Request, res: Response) {
    try {
        const { id } = req.params;
        
        const cacheKey = `complementoID:${id}:${req.userId}`;
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            res.status(200).json(JSON.parse(cachedData));
        } else {
            const products = await produroRepository.getComplementosRepo(parseInt(id));
            if (products) {
                await redis.setex(cacheKey, 3600, JSON.stringify(products));
                res.status(200).json(products);
            } else {
                res.status(404).json({ erro: 'Complemento não encontrado' });
            }
        }
    } catch (e) {
        res.status(401).json({ error: 'Erro ao acessar os dados: ' + e });
    }
}

export async function getProdutoById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const produto = await produroRepository.getProdutoById(parseInt(id));

        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ erro: 'Produto não encontrado' });
        }
    } catch (e) {
        res.status(401).json({ error: 'Erro ao acessar os dados: ' + e });
    }
}

export async function createProduto(req: Request, res: Response) {
    try {
        const data = req.body;
        if(req.user.adm || req.user.empresa == data.ProdEmpresa){
        const novoProduto = await produroRepository.createProduto(data);
        res.status(201).json(novoProduto);
    }else{
        res.status(401).json({error: 'sem permisão'});
    }
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar produto: ' + e });
    }
}

export async function updateProduto(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = req.body;
        if(req.user.adm || req.user.empresa == data.ProdEmpresa){
        const produtoAtualizado = await produroRepository.updateProduto(parseInt(id), data);

        if (produtoAtualizado) {
            res.status(200).json(produtoAtualizado);
        } else {
            res.status(404).json({ erro: 'Produto não encontrado' });
        }}else{
            res.status(401).json({error: 'sem permisão'});
        }
    } catch (e) {
        res.status(500).json({ error: 'Erro ao atualizar produto: ' + e });
    }
}

export async function deleteProduto(req: Request, res: Response) {
    try {
        if(req.user.adm){
        const { id } = req.params;
        const produtoExcluido = await produroRepository.deleteProduto(parseInt(id));

        if (produtoExcluido) {
            res.status(200).json(produtoExcluido);
        } else {
            res.status(404).json({ erro: 'Produto não encontrado' });
        }}else{
            res.status(401).json({error: 'sem permisão'});
        }
    } catch (e) {
        res.status(500).json({ error: 'Erro ao excluir produto: ' + e });
    }
}
