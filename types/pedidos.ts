export type Pedido = {
    empresa: string;
    dataHora: Date;
    totalPedido: number;
    taxaEntrega: number;
    formaPagamento: string;
    clenteTroco: number;
    clienteNome: string;
    clienteCep: string;
    clienteEndereco: string;
    clienteNumero: string;
    clienteComplemento: string;
    clienteBairro: string;
    clienteCidade: string;
    clienteEstado: string;
    clienteTelefone: string;
    status: number;
    dataHoraImportacao: Date;
  };
  
  export type PedidoItem = {
    pedidoId: string;
    produto: string;
    grupoTipo: boolean
    nomeAgrupamento: string
    quantidade: number;
    valorUnitario: number;
    valorProduto: number;
    observacoes: string;
    totalComplementos: number;
    valorTotal: number;
    prodID: number;
    agrupamento: number;
    quantidadeAgrupamento: number
  };
  
  export type PedidoItemComplemento = {
    pedidoItemId: number;
    pedidoItem: PedidoItem;
    produtoComplemento: string;
    quantidadeComplemento: number;
    prodID: number;
    valorUnitarioComplemento: number;
    valorTotalComplemento: number;
  };