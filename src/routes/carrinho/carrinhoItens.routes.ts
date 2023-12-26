import { Application } from 'express';
import { atualizarCarrinho, deleteCarrinhoItens } from '../../controllers/carrinho/carrinhoItens.controller';

/**
 * @swagger
 * tags:
 *   name: Carrinho Itens
 *   description: API endpoints for managing shopping cart items.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CarrinhoItem:
 *       type: object
 *       properties:
 *         CarItensCarrrinhoID:
 *           type: number
 *           description: ID do Carrinho associado ao item
 *         CarItensProdID:
 *           type: number
 *           description: ID do Produto associado ao item
 *         CarItensQuantidade:
 *           type: number
 *           description: Quantidade do item no carrinho
 *         CarItensValorUnitario:
 *           type: number
 *           description: Valor unitário do item
 *         CarItensValorProdutos:
 *           type: number
 *           description: Valor total dos produtos no item
 *         CarItensObservacoes:
 *           type: string
 *           description: Observações do item
 *         CarItensComplemento:
 *           type: number
 *           description: ID do complemento associado ao item
 *         CarItensValorTotalGeral:
 *           type: number
 *           description: Valor total geral do item
 *         CarItensAgrupamento:
 *           type: string
 *           description: Agrupamento do item
 */

const carrinhoItensRoute = (app: Application) => {
  /**
   * @swagger
   * /carrinhoItens/{id}:
   *   delete:
   *     summary: Delete a shopping cart item by ID
   *     tags: [Carrinho Itens]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the shopping cart item
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Shopping cart item not found
   */
  app.delete('/carrinhoItens/:id', deleteCarrinhoItens);

  /**
   * @swagger
   * /carrinhoItens/{id}:
   *   put:
   *     summary: Update a shopping cart item by ID
   *     tags: [Carrinho Itens]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the shopping cart item
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CarrinhoItem"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Shopping cart item not found
   */
  app.put('/carrinhoItens/:id', atualizarCarrinho);
};

export default carrinhoItensRoute;
