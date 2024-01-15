import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ApiError } from '../helpers/erroHelper';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const jwtSecretAdm = process.env.JWT_SECRET_ADM;

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Verifique se o token JWT está presente no cabeçalho Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    if (typeof jwtSecret === 'undefined' || typeof jwtSecretAdm === 'undefined') {
        throw new ApiError("JWT secret(s) not defined", 500);
    }

    try {
        // Tentar verificar o token usando o primeiro segredo
        const decoded = await verify(token, jwtSecret);

        // O token é válido, você pode acessar os dados do token decodificado em "decoded"
        const ip = decoded;

        // Faça o que for necessário com os dados do token
        // ...
        // Adicione os dados do token decodificado à solicitação para uso posterior
        // @ts-ignore
        req.userId = ip.EmprCodigo;

        next(); // Avance para a próxima função/middleware
    } catch (error) {
        // Se a verificação do token usando o primeiro segredo falhar, tente com o segundo
        try {
            const decodedAdm = await verify(token, jwtSecretAdm);
            
            // O token é válido com o segundo segredo
            // Faça o que for necessário com os dados do token decodificado em "decodedAdm"
            // ...

            // Adicione os dados do token decodificado à solicitação para uso posterior
            // @ts-ignore
            req.user = decodedAdm;

            next(); // Avance para a próxima função/middleware
        } catch (errorAdm) {
            // Se a verificação do token com ambos os segredos falhar, você pode lidar com o erro aqui
            res.status(401).json({ error: 'Token inválido' });
        }
    }
};
