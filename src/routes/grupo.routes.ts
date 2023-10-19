import { Application } from 'express';
import { getGrupo } from '../controllers/grupo.controller';

const grupoRoute = (app: Application) => {
    app.get('/grupo/:id', getGrupo);
}

export default grupoRoute;
