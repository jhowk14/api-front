import { Application } from 'express';
import {getComplemento, getProduro} from '../../controllers/carrinho/produto.controller';

const produtoRoute = (app: Application) => {
    app.get('/produtos/:id', getProduro);
    app.get('/complementos/:id', getComplemento);
}

export default produtoRoute;
