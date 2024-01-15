import { Administracao, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ApiError } from '../../helpers/erroHelper';

const prisma = new PrismaClient();

class AdministracaoRepository {
  async createAdministracao(usuario: string, senha: string, adm: boolean, empresaId?: number): Promise<void> {
    // Check if an administration entry with the same username already exist
    const existingAdministracao = await prisma.administracao.findMany({
      where: { 
        usuario: usuario,
       },
    });
    if (existingAdministracao.length > 0) {
      throw new Error('Administracao with the same username already exists');
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    await prisma.administracao.create({
      data: {
        usuario,
        senha: hashedSenha,
        adm,
        empresaId: empresaId
      },
    });
  }

  async getAdministracaoById(id: number): Promise<Administracao | null> {
    return prisma.administracao.findUnique({
      where: { id },
    });
  }

  async getAdministracaoByUsuario(usuario: string): Promise<Administracao | null> {
    return prisma.administracao.findUnique({
      where: { usuario },
    });
  }

  async getAllAdministracao(){
    return prisma.administracao.findMany();
  }

  async updateAdministracao(id: number, data: { usuario?: string; senha?: string; adm?: boolean; empresaId?: number }): Promise<void> {
    const existingAdministracao = await prisma.administracao.findUnique({
      where: { id },
    });

    if (!existingAdministracao) {
      throw new Error('Administracao not found');
    }

    let hashedSenha: string | undefined;

    if (data.senha) {
      hashedSenha = await bcrypt.hash(data.senha, 10);
    } else {
      hashedSenha = existingAdministracao.senha;
    }

    await prisma.administracao.update({
      where: { id },
      data: {
        usuario: data.usuario,
        senha: hashedSenha,
        adm: data.adm,
        empresaId: data.empresaId
      },
    });
  }

  async deleteAdministracao(id: number): Promise<void> {
    await prisma.administracao.delete({
      where: { id },
    });
  }

  async authorizeAdmin(usuario: string, senha: string): Promise<{
    id: number;
    usuario: string;
    senha: string;
    adm: boolean | null;
    empresaId: number | null;
} | null> {
    const administracao = await prisma.administracao.findUnique({
      where: { usuario },
    });

    if (!administracao) {
        throw new ApiError('nao autorizado', 401);
    }

    const isPasswordValid = await bcrypt.compare(senha, administracao.senha);
    if(isPasswordValid){
        return administracao
    }else{
        throw new ApiError('nao autorizado', 401);
    }
  }
}

export default AdministracaoRepository;
