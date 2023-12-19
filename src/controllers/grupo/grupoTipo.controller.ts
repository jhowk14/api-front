import { Request, Response } from 'express';
import GrupoTipoRepository from '../../repositorys/grupo/grupoTipo.repo';

const grupoTipoRepository = new GrupoTipoRepository();

export async function getAllGrupoTipos(req: Request, res: Response) {
    try {
        const grupoTipos = await grupoTipoRepository.getAllGrupoTipos();
        res.status(200).json(grupoTipos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os tipos de grupo: ' + error });
    }
}

export async function getGrupoTipoById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const grupoTipo = await grupoTipoRepository.getGrupoTipoById(parseInt(id));

        if (grupoTipo) {
            res.status(200).json(grupoTipo);
        } else {
            res.status(404).json({ error: 'Tipo de Grupo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o tipo de grupo por ID: ' + error });
    }
}

export async function createGrupoTipo(req: Request, res: Response) {
    try {
        const data = req.body;
        const novoGrupoTipo = await grupoTipoRepository.createGrupoTipo(data);
        res.status(201).json(novoGrupoTipo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tipo de grupo: ' + error });
    }
}

export async function updateGrupoTipo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = req.body;
        const grupoTipoAtualizado = await grupoTipoRepository.updateGrupoTipo(parseInt(id), data);

        if (grupoTipoAtualizado) {
            res.status(200).json(grupoTipoAtualizado);
        } else {
            res.status(404).json({ error: 'Tipo de Grupo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tipo de grupo: ' + error });
    }
}

export async function deleteGrupoTipo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const grupoTipoExcluido = await grupoTipoRepository.deleteGrupoTipo(parseInt(id));

        if (grupoTipoExcluido) {
            res.status(200).json(grupoTipoExcluido);
        } else {
            res.status(404).json({ error: 'Tipo de Grupo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir tipo de grupo: ' + error });
    }
}
