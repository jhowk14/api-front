import { Application } from 'express';
import { createCarrinho, deleteCarrinho, getCarrinho, listCarrinhos, updateCarrinho, createCarrinhoID } from '../controllers/carrinho.controller';

const carrinhoRoute = (app: Application) => {
    app.post('/carrinhos', createCarrinho);
    app.post('/carrinhos/:id', createCarrinhoID);
    app.get('/carrinhos/:id', getCarrinho);
    app.put('/carrinhos/:id', updateCarrinho);
    app.delete('/carrinhos/:id', deleteCarrinho);
    app.get('/carrinhos', listCarrinhos);
}

export default carrinhoRoute;
