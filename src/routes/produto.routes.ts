import { Application } from 'express';
import getProduro from '../controllers/produto.controller';

const produtoRoute = (app: Application) => {
    app.get('/produtos/:id', getProduro);
}

export default produtoRoute;
