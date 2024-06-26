;import { ApiError } from "../../helpers/erroHelper";
import prisma from "../../services/prisma";
import { Empresas } from "@prisma/client";

export default class EmpresaRepository {
    // Método para buscar uma empresa por ID
    async getEmpresaById(id: string) {
        try {
            const empresa = await prisma.empresas.findUnique({
                where: {
                    EmprLink: id
                }
            });
            return empresa;
        } catch (error) {
            console.error("Erro ao acessar os dados:", error);
            throw new ApiError('Erro ao acessar os dados', 500);
        }
    }

    async getAllEmpresa(termo: string | null = null) {
        try {
            let empresas;
    
            // Verificar se o termo é uma string não vazia
            if (termo) {
                const isNumeric = !isNaN(Number(termo));
    
                if (isNumeric) {
                    // Pesquisar por ID
                    empresas = await prisma.empresas.findMany({
                        where: {
                            EmprCodigo: parseInt(termo),
                        },
                    });
                } else {
                    // Pesquisar por nome ignorando o caso das letras
                    empresas = await prisma.empresas.findMany({
                        where: {
                            EmprNome: {
                                contains: termo
                            },
                        },
                    });
                }
            } else {
                // Caso o termo seja uma string vazia, retorne todas as empresas
                empresas = await prisma.empresas.findMany();
            }
    
            return empresas;
        } catch (error) {
            console.error(error);
            throw new ApiError(`${error}`, 500);
        }
    }

    // Método para criar uma nova empresa
    async createEmpresa(data: Empresas) {
        try {
            const novaEmpresa = await prisma.empresas.create({
                data,
            });
            return novaEmpresa;
        } catch (error) {
            console.error("Erro ao criar empresa:", error);
            throw new ApiError("Erro ao criar empresa", 500);
        }
    }

    // Método para atualizar uma empresa existente
    async updateEmpresa(id: number, data: { /* Campos a serem atualizados */ }) {
        try {
            const empresaAtualizada = await prisma.empresas.update({
                where: {
                    EmprCodigo: id,
                },
                data,
            });
            return empresaAtualizada;
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            throw new ApiError("Erro ao atualizar empresa", 500);
        }
    }
    async updateImageEmpresa(id: string, data: { EmprLogotipo: Buffer, EmprImagemCabecalho: Buffer }) {
        try {
            const empresaAtualizada = await prisma.empresas.update({
                where: {
                    EmprLink: id,
                },
                data:{
                    EmprLogotipo: data.EmprLogotipo,
                    EmprImagemCabecalho: data.EmprImagemCabecalho
                }
            });
            return empresaAtualizada;
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            throw new ApiError("Erro ao atualizar empresa", 500);
        }
    }
    
    // Método para excluir uma empresa
    async deleteEmpresa(id: number) {
        try {
            const empresaExcluida = await prisma.empresas.delete({
                where: {
                    EmprCodigo: id,
                },
            });
            return empresaExcluida;
        } catch (error) {
            console.error("Erro ao excluir empresa:", error);
            throw new ApiError("Erro ao excluir empresa", 500);
        }
    }

    // adiciona imageims byte de teste
    /* async createEmpresaRepo() {
         try {
 
             const image1 = path.resolve(__dirname, '../../public', 'logo.png');
             const image2 = path.resolve(__dirname, '../../public', 'Bella-Capri-2.jpeg');
             console.log(image1)
             const imageLogo = await this.saveImageToDatabase(image1)
             const ImagemCabecalho = await this.saveImageToDatabase(image2)
             
             console.log(imageLogo)
             const novaEmpresa = await prisma.empresas.update({
                 where:{
                     EmprCodigo: 1,
                 },
                 data: {
                     EmprImagemCabecalho: ImagemCabecalho!,
                     EmprLogotipo: imageLogo!,
                 },
             });
 
             return novaEmpresa;
         } catch (error) {
             console.error("Erro ao criar empresa:", error);
             throw new ApiError("Erro ao criar empresa", 500);
         }
     }
     async saveImageToDatabase(filePath: string) {
         try {
           const imageBuffer = await sharp(filePath).toBuffer();
           return imageBuffer
         } catch (error) {
           console.error("Erro ao salvar a imagem no banco de dados:", error);
         }
       } */
    
}