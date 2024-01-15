import { Request, Response } from 'express';
import EmpresaRepository from '../../repositorys/empresa/empresa.repo';
import { redis } from '../../services/redis';

const empresa = new EmpresaRepository();

export const getEmpresa = async (req: Request, res: Response) => { 
    try {
        const id = req.params.id;
        const cacheKey = `empresasID:${id}`;
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            res.json(JSON.parse(cachedData));
        } else {
            const response = await empresa.getEmpresaById(id);

            if (response) {
                await redis.setex(cacheKey, 3600, JSON.stringify(response));
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'Empresa not found' });
            }
        }
    } catch (error) {
        console.error('Error in getEmpresa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllEmpresa = async (req: Request, res: Response) => { 
        try {
            if(req.user.adm){
            const id = req.params.id;
                const response = await empresa.getAllEmpresa(id);
    
                if (response) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({ error: 'Empresa not found' });
                }
            
        }else{
            res.status(401).json({error: 'sem permisão'});
        }
        } catch (error) {
            console.error('Error in getEmpresa:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

export const createEmpresa = async (req: Request, res: Response) => { 
    try {
        if(req.user.adm){
        const data = req.body;
        const response = await empresa.createEmpresa(data);
        res.status(201).json(response);
    }else{
        res.status(401).json({error: 'sem permisão'});
        }
    } catch (error) {
        console.error('Error in createEmpresa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateEmpresa = async (req: Request, res: Response) => { 
    try {
        if(req.user.adm){
        const id = req.params.id;
        const data = req.body;
        const response = await empresa.updateEmpresa(parseInt(id), data);

        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Empresa not found' });
        }}else{
            res.status(401).json({error: 'sem permisão'});
        }
    } catch (error) {
        console.error('Error in updateEmpresa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteEmpresa = async (req: Request, res: Response) => { 
    try {
        if(req.user.adm){
        const id = req.params.id;
        const response = await empresa.deleteEmpresa(parseInt(id));

        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Empresa not found' });
        }}else{
            res.status(401).json({error: 'sem permisão'});
        }
    } catch (error) {
        console.error('Error in deleteEmpresa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
