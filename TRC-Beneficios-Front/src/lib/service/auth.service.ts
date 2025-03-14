// import { IBeneficiario } from "../interfaces/IBeneficiario";
import { IUsers } from "../interfaces/IUsers";
import { api, requestConfig } from "../utils/config";

const postLogin = async (user: IUsers) => {
  const config = requestConfig("POST", user);
  
  try {
    const res = await fetch(`${api}/login`, config).then((res) =>
      res.json()
  );
  
  
  return res;
} catch (error) {
  console.error(error);
}
};

const authService = {
  postLogin,
};


export default authService;