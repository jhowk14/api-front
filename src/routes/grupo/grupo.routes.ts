import { Application } from 'express';
import { getGrupo, getGrupoid, createGrupo, updateGrupo, deleteGrupo } from '../../controllers/grupo/grupo.controller';

const grupoRoute = (app: Application) => {
    app.get('/grupo/:id', getGrupo);
    app.get('/grupoid/:id', getGrupoid);
    app.post('/grupo', createGrupo);
    app.put('/grupo/:id', updateGrupo);
    app.delete('/grupo/:id', deleteGrupo);
}

export default grupoRoute;
