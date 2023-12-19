import empresaRoute from "./empresa/empresa.routes";
import { Application } from 'express'; 
import grupoRoute from "./grupo/grupo.routes";
import sessionToken from "./empresa/sessionToken.routes";
import carrinhoRoute from "./carrinho/carrinho.routes";
import produtoRoute from "./produto/produto.routes";
import carrinhoItensRoute from "./carrinho/carrinhoItens.routes";
import pedidoRoute from "./pedido/pedido.routes";
import grupoTipoRoute from "./grupo/grupoTipo.routes";
import produtoValoresTipoRoute from "./produto/produtoTipo.routes";

const routes = (app: Application) => {
    empresaRoute(app)
    grupoRoute(app)
    sessionToken(app)
    carrinhoRoute(app)
    produtoRoute(app)
    carrinhoItensRoute(app)
    pedidoRoute(app)
    grupoTipoRoute(app)
    produtoValoresTipoRoute(app)
}

export default routes