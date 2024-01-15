/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API endpoints for managing products.
 * 
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         ProdID:
 *           type: integer
 *           description: ID do Produto
 *         ProdGrupo:
 *           type: integer
 *           description: ID do Grupo associado ao Produto
 *         ProdEmpresa:
 *           type: integer
 *           description: ID da Empresa associada ao Produto
 *         ProdCodigo:
 *           type: integer
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
 *           type: integer
 *           description: ID do Produto (opcional, usado para atualização)
 *       required:
 *         - ProdGrupo
 *         - ProdEmpresa
 *         - ProdCodigo
 *         - ProdDescricao
 *         - ProdValor
 *         - ProdHoraInicial
 *         - ProdHoraFinal
 *         - ProdClassificacao
 *         - quantidade
 * 
 */
import { Application } from 'express';
import {
  getProduro,
  getComplemento,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
  getProduroByEmpresa,
} from '../../controllers/produto/produto.controller';
import { verifyTokenMiddleware } from '../../middleware/verifyTokenMiddleware';
import { authenticateToken } from '../../middleware/admMiddleware';

const produtoRoute = (app: Application) => {
/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Produtos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the product
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Produto"
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Product not found
 */
app.put('/produto/:id', authenticateToken, updateProduto);
  /**
   * @swagger
   * /produtos/{id}:
   *   get:
   *     summary: Get a product by ID grupo
   *     tags:
   *       - Produtos
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product not found
   * 
   */
  app.get('/produtos/:id', verifyTokenMiddleware, getProduro);
    /**
   * @swagger
   * /Allprodutos/{id}:
   *   get:
   *     summary: Get a product by Empresa ID
   *     tags:
   *       - Produtos
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product not found
   * 
   */
  app.get('/Allprodutos/:id', authenticateToken, getProduroByEmpresa);

  /**
   * @swagger
   * /complementos/{id}:
   *   get:
   *     summary: Get a complemento by ID
   *     tags:
   *       - Produtos
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the complemento
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Complemento not found
   *   
   */
  app.get('/complementos/:id', verifyTokenMiddleware, getComplemento);

  /**
   * @swagger
   * /produto/{id}:
   *   get:
   *     summary: Get a product by ID grupo
   *     tags:
   *       - Produtos
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product not found
   *   
   */
  app.get('/produto/:id', verifyTokenMiddleware ,getProdutoById);

  /**
   * @swagger
   * /produto:
   *   post:
   *     summary: Create a new product
   *     tags:
   *       - Produtos
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Produto"
   *     responses:
   *       201:
   *         description: Product created
   *  
   */
  app.post('/produto', authenticateToken, createProduto);

  /**
   * @swagger
   * /produto/{id}:
   *   put:
   *     summary: Update a product by ID
   *     tags:
   *       - Produtos
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Produto"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product not found
   *
   *   delete:
   *     summary: Delete a product by ID
   *     tags:
   *       - Produtos
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the product
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Product not found
   *  
   */
  app.delete('/produto/:id', authenticateToken, deleteProduto);
};

export default produtoRoute;
