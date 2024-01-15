import { Application } from 'express';

import { authorizeAdmin, createAdministracao, deleteAdministracao, getAdministracaoById, getAdministracaoByUsuario, getAllAdministracao, updateAdministracao } from '../../controllers/adminstracao/ad.controller';
import { authenticateToken } from '../../middleware/admMiddleware';
const administracaoRoute = (app: Application) => {

  /**
   * @swagger
   * tags:
   *   name: Administracao
   *   description: End points relacionados a administração do sistema e Permições de rota
   * 
   * components:
   *   schemas:
   *     CreateAdministracao:
   *       type: object
   *       properties:
   *         usuario:
   *           type: string
   *           minLength: 1
   *         senha:
   *           type: string
   *           minLength: 1
   *         adm:
   *           type: boolean
   *     UpdateAdministracao:
   *       type: object
   *       properties:
   *         usuario:
   *           type: string
   *           minLength: 1
   *         senha:
   *           type: string
   *           minLength: 1
   *     AuthorizeAdmin:
   *       type: object
   *       properties:
   *         usuario:
   *           type: string
   *         senha:
   *           type: string

   * /administracao:
   *   post:
   *     summary: Create a new administrative user
   *     tags: [Administracao]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CreateAdministracao"
   *     responses:
   *       200:
   *         description: Administrative user created
   * 
   * /administracao/{id}:
   *   get:
   *     summary: Get an administrative user by ID
   *     tags: [Administracao]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *         description: ID of the administrative user
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Administrative user not found

   *   delete:
   *     summary: Delete an administrative user by ID
   *     tags: [Administracao]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *         description: ID of the administrative user
   *     responses:
   *       200:
   *         description: Administrative user deleted
   * 
   *   put:
   *     summary: Update an administrative user by ID
   *     tags: [Administracao]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *         description: ID of the administrative user
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CreateAdministracao"
   *     responses:
   *       200:
   *         description: Administrative user updated

   * /administracao/authorize:
   *   post:
   *     summary: Authorize an administrative user
   *     tags: [Administracao]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/AuthorizeAdmin"
   *     responses:
   *       200:
   *         description: Authorization granted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 token:
   *                   type: string
   *       401:
   *         description: Unauthorized
   */

   app.post('/administracao', authenticateToken, createAdministracao);
   app.get('/administracao/:id', authenticateToken, getAdministracaoById);
   app.get('/AllAdministracao', authenticateToken, getAllAdministracao);
// app.get('/administracao/:id', authenticateToken, getAdministracaoByUsuario);
   app.delete('/administracao/:id', authenticateToken, deleteAdministracao);
   app.put('/administracao/:id', authenticateToken, updateAdministracao);
   app.post('/administracao/authorize', authorizeAdmin);
};

export default administracaoRoute;
