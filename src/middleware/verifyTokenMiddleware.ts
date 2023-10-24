import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ApiError } from '../helpers/erroHelper';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Verifique se o token JWT está presente no cabeçalho Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    if (typeof jwtSecret === 'undefined') {
        throw new ApiError("JWT secret Not defined", 500);
    }

    try {
        // Verifique a autenticidade do token
        const decoded = verify(token, jwtSecret);

        // O token é válido, você pode acessar os dados do token decodificado em "decoded"
        // Por exemplo, aqui estamos acessando o campo "ip" que foi incluído ao criar o token
        const ip = decoded;

        // Faça o que for necessário com os dados do token
        // ...

        // Adicione os dados do token decodificado à solicitação para uso posterior
        req.userId = ip;

        next(); // Avance para a próxima função/middleware
    } catch (error) {
        // Se a verificação do token falhar, você pode lidar com o erro aqui
        res.status(401).json({ error: 'Token inválido' });
    }
};
