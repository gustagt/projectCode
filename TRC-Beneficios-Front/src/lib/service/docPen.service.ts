import { IDataDocPen } from "../interfaces/IDataDocPen";
import { api, requestConfig } from "../utils/config";


const getdocPen = async (cpf:string, token?: string, ) => {
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


const putdocPen = async (  dataDocPen: IDataDocPen, token?: string, id?: string ) => {
  const config = requestConfig("PUT", dataDocPen , token);
  

  try {
    const res = await fetch(`${api}/docPen/id/${id}`, config).then((res) =>
      res.json()
    );

    return res;
  } catch (error) {
    console.error(error);
  }

}

const docPenCredencial = {
    getdocPen,
    putdocPen
};

export default docPenCredencial;