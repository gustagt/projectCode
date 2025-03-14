export interface IDataProtocol {
    beneficiarios_cpf: string;
    data_analise: string;
    data_docpen: string | null;
    data_entregue: string;
    data_enviado: string;
    data_producao: string;
    entrega_crd: number;
    n_protocolo: number;
    observacoes: string | null;
    servico: string;
    status: string;
    tipo: string;
  }