import { Application } from 'express';
import {
  createProdutoValoresTipo,
  deleteProdutoValoresTipo,
  getAllProdutoValoresTipos,
  getProdutoValoresTipoById,
  updateProdutoValoresTipo,
} from '../../controllers/produto/produtoTipo.controller';

/**
 * @swagger
 * tags:
 *   name: Produto Valores Tipos
 *   description: API endpoints for managing product values types.
 */

const produtoValoresTipoRoute = (app: Application) => {
  /**
   * @swagger
   * /produtoValoresTipos:
   *   get:
   *     summary: Get all product values types
   *     tags: [Produto Valores Tipos]
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: No product values types found
   */
  app.get('/produtoValoresTipos', getAllProdutoValoresTipos);

  /**
   * @swagger
   * /produtoValoresTipos/{id}:
   *   get:
   *     summary: Get a product values type by ID
   *     tags: [Produto Valores Tipos]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product values type
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product values type not found
   */
  app.get('/produtoValoresTipos/:id', getProdutoValoresTipoById);

  /**
   * @swagger
   * /produtoValoresTipos:
   *   post:
   *     summary: Create a new product values type
   *     tags: [Produto Valores Tipos]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/ProdutoValoresTipo"
   *     responses:
   *       201:
   *         description: Product values type created
   */
  app.post('/produtoValoresTipos', createProdutoValoresTipo);

  /**
   * @swagger
   * /produtoValoresTipos/{id}:
   *   put:
   *     summary: Update a product values type by ID
   *     tags: [Produto Valores Tipos]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product values type
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/ProdutoValoresTipo"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product values type not found
   */
  app.put('/produtoValoresTipos/:id', updateProdutoValoresTipo);

  /**
   * @swagger
   * /produtoValoresTipos/{id}:
   *   delete:
   *     summary: Delete a product values type by ID
   *     tags: [Produto Valores Tipos]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product values type
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product values type not found
   */
  app.delete('/produtoValoresTipos/:id', deleteProdutoValoresTipo);
};

export default produtoValoresTipoRoute;

/**
 * @swagger
 * components:
 *   schemas:
 *     ProdutoValoresTipo:
 *       type: object
 *       properties:
 *         PrVtID:
 *           type: integer
 *           description: ID do Produto Valores Tipo
 *         PrVtProdID:
 *           type: integer
 *           description: ID do Produto associado ao Valores Tipo
 *         PrVtGrTpID:
 *           type: integer
 *           description: ID do Grupo Tipo associado ao Valores Tipo
 *         PrVtValor:
 *           type: number
 *           description: Valor do Produto Valores Tipo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do Produto Valores Tipo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização do Produto Valores Tipo
 *       required:
 *         - PrVtProdID
 *         - PrVtGrTpID
 *         - PrVtValor
 */
