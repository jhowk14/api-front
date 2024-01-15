/**
 * @swagger
 * tags:
 *   name: Pedido
 *   description: API endpoints for managing orders.
 * 
 * components:
 *   schemas:
 *     DataPedido:
 *       type: object
 *       properties:
 *         Pedido:
 *           $ref: "#/components/schemas/Pedido"
 *         PedidoItens:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/PedidoItem"
 *         PedidoComplementos:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/PedidoItemComplemento"
 * 
 *     Pedido:
 *       type: object
 *       properties:
 *         empresa:
 *           type: string
 *         empresaTelefone:
 *           type: string
 *         dataHora:
 *           type: string
 *           format: date-time
 *         totalPedido:
 *           type: number
 *         taxaEntrega:
 *           type: number
 *         formaPagamento:
 *           type: string
 *         clenteTroco:
 *           type: number
 *         clienteNome:
 *           type: string
 *         clienteCep:
 *           type: string
 *         clienteEndereco:
 *           type: string
 *         clienteNumero:
 *           type: string
 *         clienteComplemento:
 *           type: string
 *         clienteBairro:
 *           type: string
 *         clienteCidade:
 *           type: string
 *         clienteEstado:
 *           type: string
 *         clienteTelefone:
 *           type: string
 *         status:
 *           type: number
 *         dataHoraImportacao:
 *           type: string
 *           format: date-time
 * 
 *     PedidoItem:
 *       type: object
 *       properties:
 *         pedidoId:
 *           type: string
 *         produto:
 *           type: string
 *         grupoTipo:
 *           type: boolean
 *         nomeAgrupamento:
 *           type: string
 *         quantidade:
 *           type: number
 *         valorUnitario:
 *           type: number
 *         valorProduto:
 *           type: number
 *         observacoes:
 *           type: string
 *         totalComplementos:
 *           type: number
 *         valorTotal:
 *           type: number
 *         prodID:
 *           type: number
 *         agrupamento:
 *           type: number
 *         quantidadeAgrupamento:
 *           type: number
 * 
 *     PedidoItemComplemento:
 *       type: object
 *       properties:
 *         pedidoItemId:
 *           type: number
 *         pedidoItem:
 *           $ref: "#/components/schemas/PedidoItem"
 *         produtoComplemento:
 *           type: string
 *         quantidadeComplemento:
 *           type: number
 *         prodID:
 *           type: number
 *         valorUnitarioComplemento:
 *           type: number
 *         valorTotalComplemento:
 *           type: number
 */

import { Application } from 'express';
import { createPedido, deletePedido, getPedidoById, updatePedido } from '../../controllers/pedido/pedido.controller';
import { verifyTokenMiddleware } from '../../middleware/verifyTokenMiddleware';

const pedidoRoute = (app: Application) => {
  
  /**
   * @swagger
   * /pedido:
   *   post:
   *     summary: Create a new order
   *     tags: [Pedido]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/DataPedido"
   *     responses:
   *       201:
   *         description: Order created
   */

  app.post('/pedido', verifyTokenMiddleware, createPedido);

  /**
   * @swagger
   * /pedido/{id}:
   *   get:
   *     summary: Get an order by ID
   *     tags: [Pedido]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the order
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Order not found
   */

  app.get('/pedido/:id', getPedidoById);

  /**
   * @swagger
   * /pedido/{id}:
   *   put:
   *     summary: Update an order by ID
   *     tags: [Pedido]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the order
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Pedido"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Order not found
   */

  app.put('/pedido/:id', updatePedido);

  /**
 * @swagger
 * /pedido/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Pedido]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the order to delete
 *     responses:
 *       204:
 *         description: Order successfully deleted
 *       404:
 *         description: Order not found
 */

app.delete('/pedido/:id', deletePedido);
};

export default pedidoRoute;
