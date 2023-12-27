/**
 * @swagger
 * tags:
 *   name: Grupo
 *   description: API endpoints for managing groups.
 * 
 * components:
 *   schemas:
 *     Grupos:
 *       type: object
 *       properties:
 *         GrupID:
 *           type: integer
 *           description: ID do grupo
 *         GrupCodigo:
 *           type: integer
 *           description: Código do grupo
 *         GrupDescricao:
 *           type: string
 *           description: Descrição do grupo
 *         GrupEmpresa:
 *           type: integer
 *           description: ID da empresa associada ao grupo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora da última atualização do registro
 */

import { Application } from 'express';
import { getGrupo, getGrupoid, createGrupo, updateGrupo, deleteGrupo } from '../../controllers/grupo/grupo.controller';

const grupoRoute = (app: Application) => {
  /**
   * @swagger
   * /grupo/{id}:
   *   get:
   *     summary: Get a group by ID
   *     tags: [Grupo]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the group
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Group not found
   */
  app.get('/grupo/:id', getGrupo);

  /**
   * @swagger
   * /grupoid/{id}:
   *   get:
   *     summary: Get a group by ID Empresa
   *     tags: [Grupo]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the group
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Group not found
   */
  app.get('/grupoid/:id', getGrupoid);

  /**
   * @swagger
   * /grupo:
   *   post:
   *     summary: Create a new group
   *     tags: [Grupo]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Grupos"
   *     responses:
   *       201:
   *         description: Group created
   */
  app.post('/grupo', createGrupo);

  /**
   * @swagger
   * /grupo/{id}:
   *   put:
   *     summary: Update a group by ID
   *     tags: [Grupo]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the group
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Grupos"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Group not found
   */
  
  app.put('/grupo/:id', updateGrupo);

  /**
   * @swagger
   * /grupo/{id}:
   *   delete:
   *     summary: Delete a group by ID
   *     tags: [Grupo]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the group
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Group not found
   */
  app.delete('/grupo/:id', deleteGrupo);
};

export default grupoRoute;
