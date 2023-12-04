import { Application } from 'express';
import { getGrupo, getGrupoid } from '../../controllers/carrinho/grupo.controller';

const grupoRoute = (app: Application) => {
    app.get('/grupo/:id', getGrupo);
    app.get('/grupoid/:id', getGrupoid);
}

export default grupoRoute;
