import { api, requestConfig } from "../utils/config";


const allBeneficiario = async (token: string, atualPage:number) => {
  const config = requestConfig("GET", null, token);


  try {
    const res = await fetch(`${api}/protocolo?page=${atualPage}`, config).then((res) =>
      res.json()
    );
    
    return res;
  } catch (error) {
    console.error(error);
  }

}

const beneficiarioInfo = {
    allBeneficiario,
};

export default beneficiarioInfo;