import { Application } from 'express';
import { createProdutoValoresTipo, deleteProdutoValoresTipo, getAllProdutoValoresTipos, getProdutoValoresTipoById, updateProdutoValoresTipo } from '../../controllers/produto/produtoTipo.controller';


const produtoValoresTipoRoute = (app: Application) => {
    app.get('/produtoValoresTipos', getAllProdutoValoresTipos);
    app.get('/produtoValoresTipos/:id', getProdutoValoresTipoById);
    app.post('/produtoValoresTipos', createProdutoValoresTipo);
    app.put('/produtoValoresTipos/:id', updateProdutoValoresTipo);
    app.delete('/produtoValoresTipos/:id', deleteProdutoValoresTipo);
}

export default produtoValoresTipoRoute;
