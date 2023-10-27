import 'express-async-errors'
import routes from './routes'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { errorMiddleware } from './middleware/error'
import schedule from 'node-schedule';
import { deleteSessionTokenRepo } from './repositorys/sessionToken.repo'

export const app = express()
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(express.static('public'));

const PORT = process.env.PORT || 3001

routes(app)
app.use(errorMiddleware)
const server = app.listen(PORT, () => console.log(`Servidor rodando na rota http://localhost:${PORT}`))

schedule.scheduleJob('0 * * * *', (fireDate) => {
    deleteSessionTokenRepo()
      .then((result) => {
        console.log(`Registros expirados removidos: ${result.count} Proxima limpara em ${fireDate}`);
      })
      .catch((error) => {
        console.error('Erro ao remover registros expirados: '+`Proxima limpara em ${fireDate}`, error);
      });
  });

process.on('SIGINT', () => {
    console.log('Servidor encerrado')
    server.close()
})