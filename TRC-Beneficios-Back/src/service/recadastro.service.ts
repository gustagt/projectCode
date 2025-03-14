import { ModelStatic, Op } from "sequelize";
import { resp, respE } from "../utils/resp";
import { protocoloAttributes } from "../interfaces/IProtocol";
import { protocolo } from "../database/models/protocolo";
import { recadastros } from "../database/models/recadastros";
import { recadastrosAttributes } from "../interfaces/IRecadastros";

class RecadastrosService {
  private model: ModelStatic<recadastros> = recadastros;

  // async getAll() {

  //     const beneficiarios = await this.model.findAll();
  //     return resp(200, "Busca de beneficiários feita com sucesso.", beneficiarios);
  // }

  // Adicione outros métodos conforme necessário, por exemplo:
  async getOneByCred(cred: number, type: string) {
    const recadastro = await this.model.findOne(
      type === "Deficiente"
        ? {
            where: {
              credencial_deficiente: cred,
            },
          }
        : {
            where: {
              credencial_idoso: cred,
            },
          }
    );
    if (!recadastro) {
        return { status: 404, message: "Recadastro não encontrado." };
    }
    return {
        status: 200,
        message: "Recadastro encontrado com sucesso.",
        data: recadastro,
      };
  }

  // async create(data: protocoloAttributes) {
  //     const newProtocol = await this.model.create(data);
  //     return resp(201, "Protocolo criado com sucesso.", newProtocol);
  // }

  async update(
    cred: number,
    type: string,
    data: recadastrosAttributes
  ) {
    const [updated] = await this.model.update(
      data,
      type === "Deficiente"
        ? {
            where: {
              credencial_deficiente: cred,
            },
          }
        : {
            where: {
              credencial_idoso: cred,
            },
          }
    );
    if (!updated) {
      return { status: 404, message: "Recadastro não encontrado." };
    }
    const updatedRecadastro = await this.model.findOne(
      type === "Deficiente"
        ? {
            where: {
              credencial_deficiente: cred,
            },
          }
        : {
            where: {
              credencial_idoso: cred,
            },
          }
    );
    return {
      status: 200,
      message: "Recadastro registrado com sucesso.",
      data: updatedRecadastro,
    };
  }

  // async delete(id: number) {
  //     const deleted = await this.model.destroy({ where: { id } });
  //     if (!deleted) {
  //         return respE(404, "Beneficiário não encontrado.");
  //     }
  //     return resp(200, "Beneficiário deletado com sucesso.", {});
  // }
}

export default RecadastrosService;
