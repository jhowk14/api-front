import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../helpers/erroHelper';
const jwtSecret = process.env.JWT_SECRET_ADM;

const authenticateDocsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o token está presente nos cookies    
  if (typeof jwtSecret === 'undefined') {
        throw new ApiError('Segredo do JWT não definido', 500);
    }
  const token = req.cookies.token;

  if (!token) {
    // Se não houver token, redireciona para a rota "/login" com um alerta
    return res.redirect('/login');
  }

  // Verifica se o token é válido
  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      // Se o token não for válido, redireciona para a rota "/login" com um alerta
      return res.redirect('/login');
    }
    // O token é válido, você pode fazer o que quiser aqui
    // Por exemplo, você pode adicionar o usuário decodificado ao objeto req para uso posterior
    req.user = decoded;

    // Chama o próximo middleware na cadeia
    next();
  });
};

export default authenticateDocsMiddleware;
