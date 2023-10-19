import { Application } from 'express';
import { GetsessionToken } from '../controllers/sessionToken.controller';

const sessionToken = (app: Application) => {
    app.post('/sessionToken', GetsessionToken);
}

export default sessionToken;
