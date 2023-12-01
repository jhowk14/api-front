import { Application, Request, Response } from 'express';
import { createEmpresa, getEmpresa } from '../controllers/empresa/empresa.controller';
import prisma from '../services/prisma';

const empresaRoute = (app: Application) => {
    app.get('/empresa/:id', getEmpresa);
    app.post('/empresa', createEmpresa);
    app.delete('/teste', async (req: Request, res: Response)=>{
        await prisma.produtos.deleteMany({
            where:{
                ProdGrupo: 3
            }
        })
    })
}

export default empresaRoute;
