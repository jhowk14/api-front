import { Application } from 'express';
import { getAllGrupoTipos, getGrupoTipoById, createGrupoTipo, updateGrupoTipo, deleteGrupoTipo } from '../../controllers/grupo/grupoTipo.controller';

const grupoTipoRoute = (app: Application) => {
    app.get('/grupoTipos', getAllGrupoTipos);
    app.get('/grupoTipos/:id', getGrupoTipoById);
    app.post('/grupoTipos', createGrupoTipo);
    app.put('/grupoTipos/:id', updateGrupoTipo);
    app.delete('/grupoTipos/:id', deleteGrupoTipo);
}

export default grupoTipoRoute;
