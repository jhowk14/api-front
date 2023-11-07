import Redis from 'ioredis';

// Configurar a conexão com o servidor Redis local
export const redis = new Redis({
  host: '192.168.0.188', // ou nome de host
  port: 6379,               // Porta padrão do Redis
});

