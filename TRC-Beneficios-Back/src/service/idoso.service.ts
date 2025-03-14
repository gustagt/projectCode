import { ModelStatic, where } from "sequelize";
import { resp, respE } from "../utils/resp";
import { protocoloAttributes } from "../interfaces/IProtocol";
import { protocolo } from "../database/models/protocolo";
import { idoso } from "../database/models/idoso";
import { beneficiarios } from "../database/models/beneficiarios";


class IdosoService {
    
    private model: ModelStatic<idoso> = idoso;

    // async getAll() {
  
    //     const beneficiarios = await this.model.findAll();
    //     return resp(200, "Busca de beneficiários feita com sucesso.", beneficiarios);
    // }

    // // Adicione outros métodos conforme necessário, por exemplo:
    // async getAllByCpf(cpf: string) {
    //     const protocols = await this.model.findAll({where: {beneficiarios_cpf: cpf}});
    //     if (!protocols) {
    //         return respE(404, "Não foram encontrado protocolos.");
    //     }
    //     return resp(200, "Protocolos foram encontrados com sucesso.", protocols);
    // }

      async getAll(page: string) {
        const idosos = await this.model.findAll({
            include: [{
                model: beneficiarios,
                as: 'beneficiarios_cpf_beneficiario',
              }],
          limit: 14,
          offset: (parseInt(page) - 1) * 14,
        });
        return resp(
          200,
          "Busca de deficientes feita com sucesso.",
          idosos
        );
      }
    

    // async create(data: protocoloAttributes) {
    //     const newProtocol = await this.model.create(data);
    //     return resp(201, "Protocolo criado com sucesso.", newProtocol);
    // }

    async getByCpf(cpf: string) {
        const credencial = await this.model.findOne({where:{beneficiarios_cpf: cpf}});
        if (!credencial) {
            return {status: 200, message: "Credencial não encontrada."};
        }
        return {status: 200, message:  "Credencial encontrada com sucesso.", data: credencial};
    }


    // async update(id: number, data: any) {
    //     const [updated] = await this.model.update(data, { where: { id } });
    //     if (!updated) {
    //         return respE(404, "Beneficiário não encontrado.");
    //     }
    //     const updatedBeneficiario = await this.model.findByPk(id);
    //     return resp(200, "Beneficiário atualizado com sucesso.", updatedBeneficiario);
    // }

    // async delete(id: number) {
    //     const deleted = await this.model.destroy({ where: { id } });
    //     if (!deleted) {
    //         return respE(404, "Beneficiário não encontrado.");
    //     }
    //     return resp(200, "Beneficiário deletado com sucesso.", {});
    // }
}

export default IdosoService;