import { Application } from 'express';
import { createCarrinho, deleteCarrinho, getCarrinho, listCarrinhos, updateCarrinho, createCarrinhoID, deleteCarrinhoToken } from '../controllers/carrinho.controller';
import { UpdateCarrinho } from '../controllers/updateCarrinho.controller';

const carrinhoRoute = (app: Application) => {
    app.post('/carrinhos', createCarrinho);
    app.post('/carrinhos/:id', createCarrinhoID);
    app.get('/carrinhos/:id', getCarrinho);
    app.put('/carrinhos/:id', updateCarrinho);
    app.delete('/carrinhos/:id', deleteCarrinhoToken);
    app.delete('/carrinhoID/:id', deleteCarrinho)
    app.get('/carrinhos', listCarrinhos);
    app.put('/UpdateCarrinho', UpdateCarrinho)
}

export default carrinhoRoute;
