import { Request, Response } from 'express';
import EmpresaRepository from '../repositorys/empresa.repo';
import { Empresas } from '@prisma/client';
import { redis } from '../services/redis';

const empresa = new EmpresaRepository()

export const getEmpresa = async (req: Request, res: Response) => { 
        const id = req.params.id
        const cacheKey = `empresas:${id}`;
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
                const empresaData: Partial<Empresas> = {
                        CorSite: "#e31b3d",
                        EmprBairro: "Centro",
                        EmprCidade: "São Paulo",
                        EmprEstado: "SP",
                        EmprEndereco: "Avenida Paulista, 123",
                        EmprCNPJ: "12.345.678/0001-90",
                        EmprDivisaoSabores: true,
                        EmprLink: "pizzaria",
                        EmprNome: "Sua Empresa LTDA",
                        EmprTelefone: "1198765-4321",
                        EmprNumero: "1234",
                      };
                const response = await empresa.createEmpresaRepo(empresaData);
                res.status(200).json(response);
        }catch(e){
                console.log(e)
        }

}
