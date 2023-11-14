import { Request, Response } from 'express';
import EmpresaRepository from '../repositorys/empresa.repo';
import { Empresas } from '@prisma/client';
import { redis } from '../services/redis';

const empresa = new EmpresaRepository()

export const getEmpresa = async (req: Request, res: Response) => { 
        const id = req.params.id
        const cacheKey = `empresasID:${id}`;
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
                res.json(JSON.parse(cachedData));
        }else{
                const response = await empresa.getEmpreseRepo(id);
                if(response){
                        await redis.setex(cacheKey, 3600, JSON.stringify(response))
                        res.status(200).json(response);
                }else{
                        res.status(404).json({ error: 'empresa not found' });
                }
        }
}
export const createEmpresa = async (req: Request, res: Response) => { 
        try{
                const response = await empresa.createEmpresaRepo();
                res.status(200).json(response);
        }catch(e){
                console.log(e)
        }

}
