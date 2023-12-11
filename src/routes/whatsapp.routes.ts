import { Application } from 'express';
import { confirmarCodigo, gerarCodigo } from '../controllers/whatsapp.controller';

const whatsappRoute = (app: Application) => {
    app.post('/whatsapp/gerarCodigo', gerarCodigo)
    app.post('/whatsapp/confirmarCodigo', confirmarCodigo)
}

export default whatsappRoute;
