/**
 * @swagger
 * tags:
 *   name: Empresa
 *   description: API endpoints for managing companies.
 * 
 * components:
 *   schemas:
 *     Empresas:
 *       type: object
 *       properties:
 *         EmprCodigo:
 *           type: integer
 *           description: ID da empresa
 *         EmprNome:
 *           type: string
 *           description: Nome da empresa
 *         EmprCNPJ:
 *           type: string
 *           description: CNPJ da empresa
 *         EmprLink:
 *           type: string
 *           description: Link único da empresa
 *         EmprLogotipo:
 *           type: string
 *           format: binary
 *           description: Logotipo da empresa (em formato de bytes)
 *         EmprImagemCabecalho:
 *           type: string
 *           format: binary
 *           description: Imagem do cabeçalho da empresa (em formato de bytes)
 *         EmprEndereco:
 *           type: string
 *           description: Endereço da empresa
 *         EmprNumero:
 *           type: string
 *           description: Número do endereço da empresa
 *         EmprBairro:
 *           type: string
 *           description: Bairro da empresa
 *         EmprCidade:
 *           type: string
 *           description: Cidade da empresa
 *         EmprInicioExpediente:
 *           type: string
 *           format: date-time
 *           description: Horário de início do expediente da empresa
 *         EmprFimExpediente:
 *           type: string
 *           format: date-time
 *           description: Horário de fim do expediente da empresa
 *         CorSite:
 *           type: string
 *           description: Cor do site da empresa
 *         EmprEstado:
 *           type: string
 *           description: Estado da empresa
 *         EmprTelefone:
 *           type: string
 *           description: Número de telefone da empresa
 *         EmprDivisaoSabores:
 *           type: boolean
 *           description: Indica se a empresa possui divisão de sabores
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
import { createEmpresa, getEmpresa, updateEmpresa, deleteEmpresa, getAllEmpresa } from '../../controllers/empresa/empresa.controller';
import { verifyTokenMiddleware } from '../../middleware/verifyTokenMiddleware';

const empresaRoute = (app: Application) => {
  /**
   * @swagger
   * /empresa/{id}:
   *   get:
   *     summary: Get a company by ID
   *     tags: [Empresa]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the company
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Company not found
   */
  app.get('/empresa/:id', getEmpresa);

  /**
   * @swagger
   * /empresa:
   *   get:
   *     summary: Get all companies
   *     tags: [Empresa]
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: No companies found
   */
  app.get('/Allempresa', verifyTokenMiddleware, getAllEmpresa);

  /**
   * @swagger
   * /Allempresa:
   *   post:
   *     summary: Create a new company
   *     tags: [Empresa]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Empresas"
   *     responses:
   *       201:
   *         description: Company created
   */
  app.post('/empresa', verifyTokenMiddleware, createEmpresa);

  /**
   * @swagger
   * /empresa/{id}:
   *   put:
   *     summary: Update a company by ID
   *     tags: [Empresa]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the company
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Empresas"
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Company not found
   */
  app.put('/empresa/:id', verifyTokenMiddleware, updateEmpresa);

  /**
   * @swagger
   * /empresa/{id}:
   *   delete:
   *     summary: Delete a company by ID
   *     tags: [Empresa]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID of the company
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Company not found
   */
  app.delete('/empresa/:id', verifyTokenMiddleware, deleteEmpresa);
};

export default empresaRoute;
