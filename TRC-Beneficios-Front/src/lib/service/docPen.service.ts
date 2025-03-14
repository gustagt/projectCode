import { api, requestConfig } from "../utils/config";


const docPen = async (cpf:string, token?: string, ) => {
  const config = requestConfig("GET", null, token);

  
  const cpfNumber = cpf.replace(/\D/g, '');

  try {
    const res = await fetch(`${api}/docPen/cpf/${cpfNumber}`, config).then((res) =>
      res.json()
    );

    return res;
  } catch (error) {
    console.error(error);
  }

}

const docPenCredencial = {
    docPen,
};

export default docPenCredencial;