import { Request, Response } from 'express';
import EmpresaRepository from '../repositorys/empresa.repo';

const empresa = new EmpresaRepository()

export const getEmpresa = async (req: Request, res: Response) => { 
        const id = req.params.id
        const response = await empresa.getEmpreseRepo(id);
        res.status(201).json(response);
}
export const createEmpresa = async (req: Request, res: Response) => { 
        try{
                const data = req.body
                console.log(data)
        }catch(e){
                console.log(e)
        }

}
