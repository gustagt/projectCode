
import { IProtocolos } from "../interfaces/IProtocolos";
import { api, requestConfig } from "../utils/config";


const postProtocol = async (protocolo:IProtocolos, token?: string) => {
  const config = requestConfig("GET", null, token);

  const cpfNumber = protocolo.cpf.replace(/\D/g, '');

  
  try {
    const res = await fetch(`${api}/protocolo/acmp/?id=${protocolo.protocolo}&cpf=${cpfNumber}`, config).then((res) =>
      res.json()
    );


    return res;
  } catch (error) {
    console.error(error);
  }

}

const protocolService = {
    postProtocol,
};

export default protocolService;