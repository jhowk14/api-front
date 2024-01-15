import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ApiError } from '../helpers/erroHelper';

const jwtSecret = process.env.JWT_SECRET_ADM;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Não autorizado - Token não fornecido' });
  }

  if (typeof jwtSecret === 'undefined') {
    throw new ApiError('Segredo do JWT não definido', 500);
  }

  verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: err.message }); // Envie apenas a mensagem de erro em vez do objeto de erro inteiro
    }

    // Anexe as informações do usuário à solicitação para uso posterior
    req.user = user;

    return next(); // Continue para o próximo middleware ou manipulador de rota
  });
}

export { authenticateToken };
