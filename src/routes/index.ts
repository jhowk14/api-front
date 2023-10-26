import empresaRoute from "./empresa.routes";
import { Application } from 'express'; 
import grupoRoute from "./grupo.routes";
import sessionToken from "./sessionToken.routes";
import carrinhoRoute from "./carrinho.routes";
import produtoRoute from "./produto.routes";

const routes = (app: Application) => {
    empresaRoute(app)
    grupoRoute(app)
    sessionToken(app)
    carrinhoRoute(app)
    produtoRoute(app)
}

export default routes