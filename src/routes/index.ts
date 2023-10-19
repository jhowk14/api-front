import empresaRoute from "./empresa.routes";
import { Application} from 'express'; 
import grupoRoute from "./grupo.routes";
import sessionToken from "./sessionToken.routes";

const routes = (app: Application) => {
    empresaRoute(app)
    grupoRoute(app)
    sessionToken(app)
}

export default routes