import { IForms } from "../interfaces/IForms";
import { api, requestConfig } from "../utils/config";


const postForm = async (form:IForms, token?: string, type?:string ) => {
  const config = requestConfig("POST", form, token);
  console.log(config);
  
  try {
    const res = await fetch(`${api}/formulario/${type}`, config).then((res) =>
      res.json()
    );

    return res;
  } catch (error) {
    console.error(error);
  }

}

const formService = {
    postForm,
};

export default formService;