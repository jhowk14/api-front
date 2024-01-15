import 'express-async-errors';
import routes from './routes';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { errorMiddleware } from './middleware/error';
import schedule from 'node-schedule';
import { deleteSessionTokenRepo } from './repositorys/empresa/sessionToken.repo';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser';
import authenticateDocsMiddleware from './middleware/authenticateDocsMiddleware';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '40mb' }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'OH Delivery API',
      version: '1.0.0',
      description: 'api de delivery',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      }, 
    ],
  },
  apis: ['src/routes/**/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions)

routes(app);

app.use(errorMiddleware);

app.get('/api', authenticateDocsMiddleware,(req, res) => {
  return res.send(specs)
})
app.use('/api-docs-swagger', swaggerUi.serve);
app.get('/api-docs-swagger', authenticateDocsMiddleware,swaggerUi.setup(specs))

app.get('/api-docs', authenticateDocsMiddleware,(req, res) => {
  const filePath = path.join(__dirname, '../docs', 'index.html');
  res.sendFile(filePath);
});
app.get('/login', (req, res) => {
  const filePath = path.join(__dirname, '../docs', 'login.html');
  res.sendFile(filePath);
});

const server = app.listen(PORT, () => console.log(`Servidor rodando na rota http://localhost:${PORT}`));

schedule.scheduleJob('0 * * * *', (fireDate) => {
  deleteSessionTokenRepo()
    .then((result) => {
      console.log(`Registros expirados removidos: ${result.count} Próxima limpeza em ${fireDate}`);
    })
    .catch((error) => {
      console.error('Erro ao remover registros expirados: ' + `Próxima limpeza em ${fireDate}`, error);
    });
});
