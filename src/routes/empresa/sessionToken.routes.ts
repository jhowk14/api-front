import { Application } from 'express';
import { GetsessionToken, VerifySessionToken } from '../../controllers/empresa/sessionToken.controller';

/**
 * @swagger
 * tags:
 *   name: Session Token
 *   description: API endpoints for managing session tokens.
 */

const sessionTokenRoute = (app: Application) => {
   /**
 * @swagger
 * /sessionToken:
 *   post:
 *     summary: Verify a session token
 *     tags: [Session Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmprCodigo:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
  app.post('/sessionToken', GetsessionToken);

  /**
 * @swagger
 * /verifySessionToken:
 *   post:
 *     summary: Verify a session token
 *     tags: [Session Token]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
  app.post('/verifySessionToken', VerifySessionToken);
};

export default sessionTokenRoute;
