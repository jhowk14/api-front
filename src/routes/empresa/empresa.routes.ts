import { Application } from 'express';
import { createEmpresa, getEmpresa, updateEmpresa, deleteEmpresa, getAllEmpresa } from '../../controllers/empresa/empresa.controller';

const empresaRoute = (app: Application) => {
    app.get('/empresa/:id', getEmpresa);
    app.get('/empresa', getAllEmpresa);
    app.post('/empresa', createEmpresa);
    app.put('/empresa/:id', updateEmpresa);
    app.delete('/empresa/:id', deleteEmpresa);
}

export default empresaRoute;