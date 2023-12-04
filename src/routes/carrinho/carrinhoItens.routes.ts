import { Application } from 'express';
import { atualizarCarrinho, deleteCarrinhoItens } from '../../controllers/carrinho/carrinhoItens.controller';

const carrinhoItensRoute = (app: Application) => {
    app.delete('/carrinhoItens/:id', deleteCarrinhoItens);
    app.put('/carrinhoItens/:id', atualizarCarrinho);
    
}

export default carrinhoItensRoute;
