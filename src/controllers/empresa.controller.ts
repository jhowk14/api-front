import { Request, Response } from 'express';
import EmpresaRepository from '../repositorys/empresa.repo';
import { Empresas } from '@prisma/client';

const empresa = new EmpresaRepository()

export const getEmpresa = async (req: Request, res: Response) => { 
        const id = req.params.id
        const response = await empresa.getEmpreseRepo(id);
        res.status(200).json(response);
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
