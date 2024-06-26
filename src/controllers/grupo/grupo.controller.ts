import { Request, Response } from 'express';
import GrupoRepository from '../../repositorys/grupo/grupo.repo';
import { redis } from '../../services/redis';

const grupo = new GrupoRepository();

export const getGrupo = async (req: Request, res: Response) => { 
    try {
        const cacheKey = `grupoID:${req.userId}`;
        const cachedData = await redis.get(cacheKey);
        const adm = req.user != undefined ? req.user.adm : false
        if (cachedData && !adm) {
            res.json(JSON.parse(cachedData));
        } else {
            const response = await grupo.getGruposByEmpresa(req.userId);

            if (response) {
                await redis.setex(cacheKey, 3600, JSON.stringify(response));
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'Grupo not found' });
            }
        }
    } catch (error) {
        console.error('Error in getGrupo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getGrupoid = async (req: Request, res: Response) => { 
    try {
        const id = req.params.id;
        const cacheKey = `grupo:${id}:${req.userId}`;
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            res.json(JSON.parse(cachedData));
        } else {
            const response = await grupo.getGrupoById(parseInt(id));

            if (response) {
                await redis.setex(cacheKey, 3600, JSON.stringify(response));
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'Grupo not found' });
            }
        }
    } catch (error) {
        console.error('Error in getGrupoid:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createGrupo = async (req: Request, res: Response) => { 
    try {
        const data = req.body;
    if(req.user.adm){
        const response = await grupo.createGrupo(data);
        res.status(201).json(response);
    }else{
        res.status(401).json({error: 'sem permisão'});
    }
    } catch (error) {
        console.error('Error in createGrupo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateGrupo = async (req: Request, res: Response) => { 
    try {
        const id = req.params.id;
        const data = req.body;
        if(req.user.adm){
        const response = await grupo.updateGrupo(parseInt(id), data);

        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Grupo not found' });
        }
    }
    } catch (error) {
        console.error('Error in updateGrupo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteGrupo = async (req: Request, res: Response) => { 
    try {
        const id = req.params.id;
        const response = await grupo.deleteGrupo(parseInt(id));
        if(req.user.adm){
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Grupo not found' });
        }
    }
    } catch (error) {
        console.error('Error in deleteGrupo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
