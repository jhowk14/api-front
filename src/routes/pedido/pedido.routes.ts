import { Application } from 'express';
import { createPedido , getPedidoById, updatePedido} from '../../controllers/pedido/pedido.controller';

const pedidoRoute = (app: Application) => {
    app.post('/pedido', createPedido);
    app.get('/pedido/:id', getPedidoById);
    app.put('/pedido/:id', updatePedido);
}

export default pedidoRoute;
