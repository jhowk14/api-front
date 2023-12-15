import empresaRoute from "./empresa/empresa.routes";
import { Application } from 'express'; 
import grupoRoute from "./produto/grupo.routes";
import sessionToken from "./empresa/sessionToken.routes";
import carrinhoRoute from "./carrinho/carrinho.routes";
import produtoRoute from "./produto/produto.routes";
import carrinhoItensRoute from "./carrinho/carrinhoItens.routes";
import pedidoRoute from "./pedido/pedido.routes";

const routes = (app: Application) => {
    empresaRoute(app)
    grupoRoute(app)
    sessionToken(app)
    carrinhoRoute(app)
    produtoRoute(app)
    carrinhoItensRoute(app)
    pedidoRoute(app)
}

export default routes