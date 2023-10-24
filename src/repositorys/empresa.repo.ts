import { Empresas } from "@prisma/client";
import { ApiError } from "../helpers/erroHelper";
import prisma from "../services/prisma";
import sharp from "sharp";
import path from 'path';

export default class EmpresaRepository {
    async createEmpresaRepo(data: Partial<Empresas>) {
        try {

            const image1 = path.resolve(__dirname, '../public', 'unnamed.png');
            const image2 = path.resolve(__dirname, '../public', 'Afinal-o-que-e-bella-capri-e-por-que-esse-nome.png');


            const imageLogo = await this.saveImageToDatabase(image1)
            const ImagemCabecalho = await this.saveImageToDatabase(image2)
       
            const novaEmpresa = await prisma.empresas.update({
                where:{
                    EmprCodigo: 1
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
          // Leitura da imagem com o módulo 'sharp'
          const imageBuffer = await sharp(filePath).toBuffer();
          // Cria uma nova entrada na tabela do banco de dados para armazenar a image 
          return imageBuffer
        } catch (error) {
          console.error("Erro ao salvar a imagem no banco de dados:", error);
        }
      }
    async getEmpreseRepo(id: string){
        try {
            const task = await prisma.empresas.findUnique({
                where:{
                    EmprLink: id
                }
            })
            console.log(task)
            return task;
        } catch (e) {
            throw new ApiError('erro ao acessar os dados'+e, 401); 
        }
    }
    
    
}