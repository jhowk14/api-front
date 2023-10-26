import { Request, Response } from 'express';
import GrupoRepository from '../repositorys/grupo.repo';

const grupo = new GrupoRepository()

export const getGrupo = async (req: Request, res: Response) => { 
        const id = req.params.id
        const response = await grupo.getGrupoRepo(parseInt(id));
        res.status(201).json(response);
}
export const getGrupoid = async (req: Request, res: Response) => { 
        const id = req.params.id
        const response = await grupo.getGrupoRepoID(parseInt(id));
        res.status(201).json(response);
}
