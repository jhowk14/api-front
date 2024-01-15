import { Request, Response } from 'express';
import ProdutoValoresTipoRepository from '../../repositorys/produto/produtoTipo.repo';

const produtoValoresTipoRepository = new ProdutoValoresTipoRepository();

export async function getAllProdutoValoresTipos(req: Request, res: Response) {
    try {
        const produtoValoresTipos = await produtoValoresTipoRepository.getAllProdutoValoresTipos();
        res.status(200).json(produtoValoresTipos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os valores do produto: ' + error });
    }
}

export async function getProdutoValoresTipoById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const produtoValoresTipo = await produtoValoresTipoRepository.getProdutoValoresTipoById(parseInt(id));

        if (produtoValoresTipo) {
            res.status(200).json(produtoValoresTipo);
        } else {
            res.status(404).json({ error: 'Valores do Produto não encontrados' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os valores do produto por ID: ' + error });
    }
}

export async function createProdutoValoresTipo(req: Request, res: Response) {
    try {
        if(req.user.adm){
            const data = req.body;
            const novoProdutoValoresTipo = await produtoValoresTipoRepository.createProdutoValoresTipo(data);
            res.status(201).json(novoProdutoValoresTipo);
        }else{
            res.status(401).json({error: 'sem permisão'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar valores do produto: ' + error });
    }
}

export async function updateProdutoValoresTipo(req: Request, res: Response) {
    try {
        if(req.user.adm){
        const { id } = req.params;
        const data = req.body;
        const produtoValoresTipoAtualizado = await produtoValoresTipoRepository.updateProdutoValoresTipo(parseInt(id), data);

        if (produtoValoresTipoAtualizado) {
            res.status(200).json(produtoValoresTipoAtualizado);
        } else {
            res.status(404).json({ error: 'Valores do Produto não encontrados' });
        }
    }else{
        res.status(401).json({error: 'sem permisão'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar valores do produto: ' + error });
    }
}

export async function deleteProdutoValoresTipo(req: Request, res: Response) {
    try {
        if(req.user.adm){
        const { id } = req.params;
        const produtoValoresTipoExcluido = await produtoValoresTipoRepository.deleteProdutoValoresTipo(parseInt(id));

        if (produtoValoresTipoExcluido) {
            res.status(200).json(produtoValoresTipoExcluido);
        } else {
            res.status(404).json({ error: 'Valores do Produto não encontrados' });
        }
    }else{
            res.status(401).json({error: 'sem permisão'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir valores do produto: ' + error });
    }
}
