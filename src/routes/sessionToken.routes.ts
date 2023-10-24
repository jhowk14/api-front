import { Application } from 'express';
import { GetsessionToken, VerifySessionToken } from '../controllers/sessionToken.controller';

const sessionToken = (app: Application) => {
    app.post('/sessionToken', GetsessionToken);
    app.post('/verifySessionToken', VerifySessionToken);
}

export default sessionToken;
