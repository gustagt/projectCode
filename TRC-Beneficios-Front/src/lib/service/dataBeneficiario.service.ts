import { api, requestConfig } from "../utils/config";


const dataBeneficiarioForm = async (cpf:string, token?: string, ) => {
  const config = requestConfig("GET", null, token);

  
  const cpfNumber = cpf.replace(/\D/g, '');

  try {
    const res = await fetch(`${api}/beneficiarios/${cpfNumber}`, config).then((res) =>
      res.json()
    );

    return res;
  } catch (error) {
    console.error(error);
  }

}

const dataBeneficiario = {
    dataBeneficiarioForm,
};

export default dataBeneficiario;