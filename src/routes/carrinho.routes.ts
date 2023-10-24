import { Application } from 'express';
import { createCarrinho, deleteCarrinho, getCarrinho, listCarrinhos, updateCarrinho } from '../controllers/carrinho.controller';

const carrinhoRoute = (app: Application) => {
    app.post('/carrinhos', createCarrinho);
    app.get('/carrinhos/:id', getCarrinho);
    app.put('/carrinhos/:id', updateCarrinho);
    app.delete('/carrinhos/:id', deleteCarrinho);
    app.get('/carrinhos', listCarrinhos);
}

export default carrinhoRoute;
