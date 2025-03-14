import { Client } from "ldapts";
import config from "../../ldap/config/config";

import jwt from "../../utils/auth";
import { resp, respE } from "../../utils/resp";

class UserLdap {
  // Função para encontrar o DN de um usuário com base no sAMAccountName
  static async findUserDN(sAMAccountName: string): Promise<string | null> {
    const client = new Client({ url: config.url });

    try {
      await client.bind(config.bindDN, config.bindCredentials);

      const result = await client.search(config.baseDN, {
        filter: `(sAMAccountName=${sAMAccountName})`,
        scope: "sub",
        attributes: ["distinguishedName"],
      });

      const entry = result.searchEntries[0];

      return entry ? entry.dn : null;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.unbind();
    }
  }

  // Função para autenticar um usuário no AD usando o sAMAccountName
  static async authenticate(sAMAccountName: string, password: string):Promise<{status:number,message:string,data?:any}> {
    let userDN;

    userDN = await UserLdap.findUserDN(sAMAccountName);

    if (!userDN) {
      return respE(400, "Usuário não encontrado.");
    }

    const client = new Client({ url: config.url });

    try {
      // Tenta bind com o DN e a senha do usuário para autenticar
      await client.bind(userDN, password);

      const name = userDN.split(",OU")[0];
      let token;

      token = jwt.encode({ sAMAccountName, name });

      return resp(200, "Login feito com sucesso.", {
        username: sAMAccountName,
        name,
        token,
      });
    } catch (error) {
      console.log(error);
      return respE(500, "Falha na autenticação  do usuário");
    } finally {
      await client.unbind();
    }
  }
}

export default UserLdap;
