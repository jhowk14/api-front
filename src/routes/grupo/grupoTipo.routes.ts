/**
 * @swagger
 * tags:
 *   name: Grupo Tipos
 *   description: API endpoints for managing group types.
 * 
 * components:
 *   schemas:
 *     GrupoTipo:
 *       type: object
 *       properties:
 *         GrTpID:
 *           type: integer
 *           description: ID do GrupoTipo
 *         GrTpGrupoID:
 *           type: integer
 *           description: ID do Grupo associado ao GrupoTipo
 *         GrTpDescricao:
 *           type: string
 *           description: Descrição do GrupoTipo
 *         GrTpDivisao:
 *           type: integer
 *           description: Divisão do GrupoTipo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora da última atualização do registro
 * 
 *     GrupoTipoResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: "#/components/schemas/GrupoTipo"
 *         message:
 *           type: string
 * 
 *   parameters:
 *     GrupoTipoId:
 *       name: id
 *       in: path
 *       required: true
 *       type: integer
 *       description: ID do GrupoTipo
 * 
 * /grupoTipos:
 *   get:
 *     summary: Get all group types
 *     tags: [Grupo Tipos]
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: No group types found
 * 
 *   post:
 *     summary: Create a new group type
 *     tags: [Grupo Tipos]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/GrupoTipo"
 *     responses:
 *       201:
 *         description: Group type created
 * 
 * /grupoTipos/{id}:
 *   get:
 *     summary: Get a group type by ID
 *     tags: [Grupo Tipos]
 *     parameters:
 *       - $ref: "#/components/parameters/GrupoTipoId"
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Group type not found
 * 
 *   put:
 *     summary: Update a group type by ID
 *     tags: [Grupo Tipos]
 *     parameters:
 *       - $ref: "#/components/parameters/GrupoTipoId"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/GrupoTipo"
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Group type not found
 * 
 *   delete:
 *     summary: Delete a group type by ID
 *     tags: [Grupo Tipos]
 *     parameters:
 *       - $ref: "#/components/parameters/GrupoTipoId"
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Group type not found
 */

import { Application } from 'express';
import {
  getAllGrupoTipos,
  getGrupoTipoById,
  createGrupoTipo,
  updateGrupoTipo,
  deleteGrupoTipo,
} from '../../controllers/grupo/grupoTipo.controller';

const grupoTipoRoute = (app: Application) => {
  /**
   * @swagger
   * /grupoTipos:
   *   get:
   *     summary: Get all group types
   *     tags: [Grupo Tipos]
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: No group types found
   */
  app.get('/grupoTipos', getAllGrupoTipos);

  /**
   * @swagger
   * /grupoTipos/{id}:
   *   get:
   *     summary: Get a group type by ID
   *     tags: [Grupo Tipos]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *         description: ID of the group type
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Group type not found
   */
  app.get('/grupoTipos/:id', getGrupoTipoById);

  /**
   * @swagger
   * /grupoTipos:
   *   post:
   *     summary: Create a new group type
   *     tags: [Grupo Tipos]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/GrupoTipo"
   *     responses:
   *       201:
   *         description: Group type created
   */
  app.post('/grupoTipos', createGrupoTipo);

  /**
   * @swagger
   * /grupoTipos/{id}:
   *   put:
   *     summary: Update a group type by ID
   *     tags: [Grupo Tipos]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *         description: ID of the group type
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/GrupoTipo"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Group type not found
   */
  app.put('/grupoTipos/:id', updateGrupoTipo);

  /**
   * @swagger
   * /grupoTipos/{id}:
   *   delete:
   *     summary: Delete a group type by ID
   *     tags: [Grupo Tipos]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *         description: ID of the group type
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Group type not found
   */
  app.delete('/grupoTipos/:id', deleteGrupoTipo);
};

export default grupoTipoRoute;
