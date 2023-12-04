import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ApiError } from '../../helpers/erroHelper';
import {getSessionTokenRepo} from '../../repositorys/empresa/sessionToken.repo';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const GetsessionToken = async (req: Request, res: Response) => {
        const ip = req.ip;
        const { EmprCodigo } = req.body


        if (typeof jwtSecret === 'undefined') {
            throw new ApiError("JWT secret Not defined", 500)
        }

        const token = sign({ ip }, jwtSecret, {
            expiresIn: '1h',
        });

        const session = await getSessionTokenRepo(EmprCodigo, token)

        res.status(200).json({ session, token });
}
export const VerifySessionToken = async (req: Request, res: Response) => {
    // Verifique se o token JWT está presente no cabeçalho Authorization
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
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

        const ip = decoded;

        res.status(200).json({ message: 'Token válido', ip });
    } catch (error) {
        // Se a verificação do token falhar, você pode lidar com o erro aqui
        res.status(401).json({ error: 'Token inválido' });
    }
}