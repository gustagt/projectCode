import { beneficiariosAttributes } from "../interfaces/IBeneficios";
import { deficienteAttributes } from "../interfaces/IDeficiente";
import { idosoAttributes } from "../interfaces/IIDoso";
import { protocoloAttributes } from "../interfaces/IProtocol";
import DeficienteService from "../service/deficiente.service";
import IdosoService from "../service/idoso.service";

export async function validateOne(
  ben: beneficiariosAttributes,
  credencial: idosoAttributes | deficienteAttributes | undefined,
  prot: protocoloAttributes[],
  type: string,
  dataAtual: Date
): Promise<{pass: boolean, recadastro?:boolean, error?: string}> {
  const serviceD = new DeficienteService();
  const serviceI = new IdosoService();

  

  const protocols = prot.filter((p) => p.tipo === type);

  if (protocols.length === 0) return {pass: true};
  
  const protocolsOpen = protocols.filter(
    (p) => p.status !== "Finalizado" && p.status !== "Indeferido"
  );
  
  if (protocolsOpen.length !== 0) return {pass: false, error: "Já existe um protocolo em aberto com esse cpf."};


  const protocolsSoli = protocols.filter(
    (p) => p.servico === "Solicitação para Credencial"
  );

  if (protocolsSoli.length === 0) return {pass: true};

  const protocolLast = protocolsSoli[protocolsSoli.length - 1];

  if (protocolLast.status !== "Finalizado") return {pass: true};



  const dataRecadastro = new Date(credencial!.data_validade!);
  dataRecadastro.setDate(dataRecadastro.getDate() - 31);


  if (dataAtual > dataRecadastro) {
    return {pass: true, recadastro: true};
    // Adicione a lógica que deve ser executada se dataAtual for maior que dataRecadastro
  }else{
    return {pass: false, error: "Sua credencial ainda não entrou em periodo de recadastro."};
  }
}

