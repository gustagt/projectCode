import { api, requestConfig } from "../utils/config";


const segundaVia = async (cpf:string, token?: string, type?:string ) => {
  const config = requestConfig("GET", null, token);

  
  const cpfNumber = cpf.replace(/\D/g, '');

  try {
    const res = await fetch(`${api}/${type}/${cpfNumber}`, config).then((res) =>
      res.json()
    );

    return res;
  } catch (error) {
    console.error(error);
  }

}

const formSegundaVia = {
    segundaVia,
};

export default formSegundaVia;