/**
 * @swagger
 * components:
 *   schemas:
 *     Carrinho:
 *       type: object
 *       properties:
 *         CarID:
 *           type: number
 *           description: ID do Carrinho
 *         CarDataHora:
 *           type: string
 *           format: date-time
 *           description: Data e hora do Carrinho
 *         CarDescricao:
 *           type: string
 *           description: Descrição do Carrinho
 *         CarValorTotal:
 *           type: number
 *           description: Valor total do Carrinho
 *         CarEmpresa:
 *           type: number
 *           description: ID da Empresa associada ao Carrinho
 *         CarQtd:
 *           type: number
 *           nullable: true
 *           description: Quantidade do Carrinho (pode ser nulo)
 *         CarTaxaEntrega:
 *           type: number
 *           description: Taxa de entrega do Carrinho
 *         CarSesToken:
 *           type: string
 *           description: Token de sessão do Carrinho
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação do Carrinho
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora da última atualização do Carrinho

 *     Produto:
 *       type: object
 *       properties:
 *         ProdID:
 *           type: number
 *           description: ID do Produto
 *         ProdGrupo:
 *           type: number
 *           description: ID do Grupo associado ao Produto
 *         ProdEmpresa:
 *           type: number
 *           description: ID da Empresa associada ao Produto
 *         ProdCodigo:
 *           type: number
 *           description: Código do Produto
 *         ProdEspecificacoes:
 *           type: string
 *           description: Especificações do Produto
 *         ProdDescricao:
 *           type: string
 *           description: Descrição do Produto
 *         ProdValor:
 *           type: number
 *           description: Valor do Produto
 *         ProdHoraInicial:
 *           type: string
 *           description: Hora inicial do Produto
 *         ProdHoraFinal:
 *           type: string
 *           description: Hora final do Produto
 *         ProdClassificacao:
 *           type: number
 *           description: Classificação do Produto
 *         quantidade:
 *           type: number
 *           description: Quantidade do Produto
 *         observacoes:
 *           type: string
 *           description: Observações do Produto
 *         produtoId:
 *           type: number
 *           nullable: true
 *           description: ID do Produto (opcional, usado para atualização)
 *
 *     ProdutoValoresTipo:
 *       type: object
 *       properties:
 *         PrVtID:
 *           type: number
 *           description: ID do Produto Valores Tipo
 *         PrVtProdID:
 *           type: number
 *           description: ID do Produto associado ao Produto Valores Tipo
 *         PrVtGrTpID:
 *           type: number
 *           description: ID do Grupo Tipo associado ao Produto Valores Tipo
 *         PrVtValor:
 *           type: number
 *           description: Valor do Produto Valores Tipo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação do Produto Valores Tipo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora da última atualização do Produto Valores Tipo
 *
 *     CarrinhoData:
 *       type: object
 *       properties:
 *         carrinho:
 *           $ref: "#/components/schemas/Carrinho"
 *         produtos:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Produto"
 *
 */

import { Application } from 'express';
import {
  createCarrinho,
  deleteCarrinho,
  getCarrinho,
  listCarrinhos,
  updateCarrinho,
  createCarrinhoID,
  deleteCarrinhoToken,
} from '../../controllers/carrinho/carrinho.controller';
import { UpdateCarrinho } from '../../controllers/carrinho/updateCarrinho.controller';
import { verifyTokenMiddleware } from '../../middleware/verifyTokenMiddleware';

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: API endpoints for managing shopping carts.
 */

const carrinhoRoute = (app: Application) => {
  /**
   * @swagger
   * /carrinhos:
   *   post:
   *     summary: Create a new shopping cart
   *     tags: [Carrinho]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CarrinhoData"
   *     responses:
   *       201:
   *         description: Shopping cart created
   */
  app.post('/carrinhos', verifyTokenMiddleware, createCarrinho);

  /**
   * @swagger
   * /carrinhos/{id}:
   *   post:
   *     summary: Create a new shopping cart with ID
   *     tags: [Carrinho]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the shopping cart
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CarrinhoData"
   *     responses:
   *       201:
   *         description: Shopping cart created
   */
  app.post('/carrinhos/:id', verifyTokenMiddleware, createCarrinhoID);

  /**
   * @swagger
   * /carrinhos/{id}:
   *   get:
   *     summary: Get a shopping cart by ID
   *     tags: [Carrinho]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the shopping cart
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Shopping cart not found
   */
  app.get('/carrinhos/:id', verifyTokenMiddleware, getCarrinho);

  /**
   * @swagger
   * /carrinhos/{id}:
   *   put:
   *     summary: Update a shopping cart by ID
   *     tags: [Carrinho]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the shopping cart
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Carrinho"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Shopping cart not found
   */
  app.put('/carrinhos/:id', verifyTokenMiddleware, updateCarrinho);

  /**
   * @swagger
   * /carrinhos/{id}:
   *   delete:
   *     summary: Delete a shopping cart by ID using a token
   *     tags: [Carrinho]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the shopping cart
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Shopping cart not found
   */
  app.delete('/carrinhos/:id', verifyTokenMiddleware, deleteCarrinhoToken);

  /**
   * @swagger
   * /carrinhoID/{id}:
   *   delete:
   *     summary: Delete a shopping cart by ID
   *     tags: [Carrinho]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the shopping cart
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Shopping cart not found
   */
  app.delete('/carrinhoID/:id', verifyTokenMiddleware, deleteCarrinho);

  /**
   * @swagger
   * /carrinhos:
   *   get:
   *     summary: Get a list of all shopping carts
   *     tags: [Carrinho]
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: No shopping carts found
   */
  app.get('/carrinhos', verifyTokenMiddleware, listCarrinhos);

  /**
   * @swagger
   * /UpdateCarrinho:
   *   put:
   *     summary: Update a shopping cart
   *     tags: [Carrinho]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
 *             type: object
 *             properties:
 *               carrinho:
 *                 type: object
 *                 properties:
 *                   CarID:
 *                     type: number
 *                     description: ID do Carrinho
 *                   CarValorTotal:
 *                     type: number
 *                     description: Valor total do Carrinho
 *               qtd:
 *                 type: number
 *                 nullable: true
 *                 description: Quantidade do Carrinho (pode ser nulo)
 *               data:
 *                 $ref: "#/components/schemas/CarrinhoItem"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Shopping cart not found
   */
  app.put('/UpdateCarrinho', verifyTokenMiddleware, UpdateCarrinho);
};

export default carrinhoRoute;
