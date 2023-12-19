import { Application } from 'express';
import {
    getProduro,
    getComplemento,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto
} from '../../controllers/produto/produto.controller';

const produtoRoute = (app: Application) => {
    app.get('/produtos/:id', getProduro);
    app.get('/complementos/:id', getComplemento);
    app.get('/produto/:id', getProdutoById);
    app.post('/produto', createProduto);
    app.put('/produto/:id', updateProduto);
    app.delete('/produto/:id', deleteProduto);
}

export default produtoRoute;
