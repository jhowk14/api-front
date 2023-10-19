import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ApiError } from '../helpers/erroHelper';
import getSessionTokenRepo from '../repositorys/sessionToken.repo';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const GetsessionToken = async (req: Request, res: Response) => {
        const ip = req.ip;
        const { EmprCodigo } = req.body


        if (typeof jwtSecret === 'undefined') {
            throw new ApiError("JWT secret Not defined", 500)
        }

        console.log(ip)
    
        const token = sign({ ip }, jwtSecret, {
            expiresIn: '1h',
        });

        const session = await getSessionTokenRepo(EmprCodigo, token)

        res.status(200).json({ session, token });
}