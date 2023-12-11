import { Application } from 'express';
import { createEmpresa, getEmpresa } from '../../controllers/empresa/empresa.controller';

const empresaRoute = (app: Application) => {
    app.get('/empresa/:id', getEmpresa);
    app.post('/empresa', createEmpresa);
}

export default empresaRoute;
