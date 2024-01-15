import { Request, Response } from 'express';
import { z } from 'zod';
import AdministracaoRepository from '../../repositorys/administracao/adm.repo';
import { sign } from 'jsonwebtoken';
import { ApiError } from '../../helpers/erroHelper';

const administracaoRepository = new AdministracaoRepository();
const jwtSecret = process.env.JWT_SECRET_ADM;
// Esquema para a atualização de dados da administração
const updateAdministracaoSchema = z.object({
  usuario: z.string().optional(),
  senha: z.string().optional(),
  adm: z.boolean().optional(),
  empresaId: z.number().optional(),
});

const createAdministracaoSchema = z.object({
  usuario: z.string().min(1),
  senha: z.string().min(1),
  adm: z.boolean(),
});

const authorizeAdminSchema = z.object({
  usuario: z.string(),
  senha: z.string(),
});

async function createAdministracao(req: Request, res: Response) {
  try {
    if(req.user.adm){
    const { usuario, senha, adm, empresaId } = req.body
    await administracaoRepository.createAdministracao(usuario, senha, adm, empresaId);
    res.json({ message: 'Administracao created' });
}else{
    res.status(401).json({error: 'sem permisão'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create administracao: ' + error });
  }
}

async function deleteAdministracao(req: Request, res: Response) {
  try {
    if(req.user.adm){
    const { id } = req.params;
    await administracaoRepository.deleteAdministracao(parseInt(id));
    res.json({ message: 'Administracao deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete administracao: ' + error });
  }
}

async function updateAdministracao(req: Request, res: Response) {
  try { 
    if(req.user.adm){
    const { id } = req.params;
    const data = updateAdministracaoSchema.parse(req.body);
    await administracaoRepository.updateAdministracao(parseInt(id), data);
    res.json({ message: 'Administracao updated' });
}else{
    res.status(401).json({error: 'sem permisão'});
}
  } catch (error) {
    res.status(500).json({ error: 'Failed to update administracao: ' + error });
  }
}

async function getAdministracaoById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const administracao = await administracaoRepository.getAdministracaoById(parseInt(id));
    if(req.user.adm){
        console.log(req.user)
        if (administracao) {
          res.json(administracao);
        } else {
          res.status(404).json({ error: 'Administracao not found' });
        }
    }else{
        res.status(401).json({error: 'sem permisão'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve administracao: ' + error });
  }
}

async function getAdministracaoByUsuario(req: Request, res: Response) {
  try {
    if(req.user.adm){
    const { usuario } = req.params;
    const administracao = await administracaoRepository.getAdministracaoByUsuario(usuario);

    if (administracao) {
      res.json(administracao);
    } else {
      res.status(404).json({ error: 'Administracao not found' });
    }
}else{
    res.status(401).json({error: 'sem permisão'});
}
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve administracao: ' + error });
  }
}
async function getAllAdministracao(req: Request, res: Response) {
  try {
    if(req.user.adm){
    const administracao = await administracaoRepository.getAllAdministracao();
    console.log(administracao)
    if (administracao) {
      res.json(administracao);
    } else {
      res.status(404).json({ error: 'Administracao not found' });
    }
}else{
    res.status(401).json({error: 'sem permisão'});
}
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve administracao: ' + error });
  }
}

async function authorizeAdmin(req: Request, res: Response) {
    if (typeof jwtSecret === 'undefined') {
        throw new ApiError('Segredo do JWT não definido', 500);
      }
  try {
    const { usuario, senha } = authorizeAdminSchema.parse(req.body);
    const administracao = await administracaoRepository.authorizeAdmin(usuario, senha);

    if (administracao) {
      // If authorization is successful, generate JWT token
      const token = sign({ usuario: administracao.usuario, adm: administracao.adm, empresa:administracao.empresaId }, jwtSecret, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      // Send the token in the response
      res.json({ message: 'Authorization granted', token });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to authorize admin: ' + error });
  }
}

export {
  createAdministracao,
  deleteAdministracao,
  updateAdministracao,
  getAdministracaoById,
  getAdministracaoByUsuario,
  authorizeAdmin,
  getAllAdministracao
};
