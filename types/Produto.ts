import { Grupo } from "./Grupos"

export type Produto = {
      ProdID: number
      ProdGrupo: number
      ProdEmpresa: number
      ProdCodigo: number
      ProdEspecificacoes: string
      ProdDescricao:string
      ProdValor:number
      ProdHoraInicial:string
      ProdHoraFinal:string
      ProdClassificacao:number
      quantidade:number
      observacoes: string
      produtoId?: number
      ValoresTipo: ProdutoValoresTipo[]
      Grupo: Grupo
}
