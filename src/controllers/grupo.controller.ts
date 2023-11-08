import { Request, Response } from 'express';
import GrupoRepository from '../repositorys/grupo.repo';
import { redis } from '../services/redis';

const grupo = new GrupoRepository()

export const getGrupo = async (req: Request, res: Response) => { 
        const id = req.params.id
        const cacheKey = `grupos:${id}`;
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
                res.json(JSON.parse(cachedData));
        }else{
        const response = await grupo.getGrupoRepo(parseInt(id));
        if(response){
                await redis.setex(cacheKey, 3600, JSON.stringify(response))
                res.status(200).json(response);
        }
}
}
export const getGrupoid = async (req: Request, res: Response) => { 
        const id = req.params.id
        const cacheKey = `grupo:${id}`;
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
                res.json(JSON.parse(cachedData));
        }else{
        const response = await grupo.getGrupoRepoID(parseInt(id));
        if(response){
                await redis.setex(cacheKey, 3600, JSON.stringify(response))
                res.status(200).json(response);
        }
}
}
