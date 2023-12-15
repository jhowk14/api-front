import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();
// Configurar a conexão com o servidor Redis local
const { REDIS_URL } = process.env;

// Verifique se a URL do Redis está presente no .env
if (!REDIS_URL) {
  throw new Error('A variável de ambiente REDIS_URL não está definida no arquivo .env');
}

// Crie uma instância do cliente Redis com base na URL
export const redis = new Redis(REDIS_URL);

