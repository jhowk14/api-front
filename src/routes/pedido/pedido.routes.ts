import { Application } from 'express';
import { createpedido } from '../../controllers/pedido/pedido.controller';

const pedidoRoute = (app: Application) => {
    app.post('/pedido', createpedido);
}

export default pedidoRoute;
