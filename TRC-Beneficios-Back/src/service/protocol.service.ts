import { ModelStatic, Op } from "sequelize";
import { resp, respE } from "../utils/resp";
import { protocoloAttributes } from "../interfaces/IProtocol";
import { protocolo } from "../database/models/protocolo";
import { beneficiarios } from "../database/models/beneficiarios";

class ProtocolService {
  private model: ModelStatic<protocolo> = protocolo;

  async getAll(page: string, query?: string) {
    const protocolos = await this.model.findAll({
      include: [
        {
          model: beneficiarios,
          as: "beneficiarios_cpf_beneficiario",
        },
      ],
      limit: 14,
      offset: (parseInt(page) - 1) * 14,
      where: query ? {
        [Op.or]: [{ status: query }, { tipo: query }],
      } : {},
    });
    return resp(200, "Busca de protocolos feita com sucesso.", protocolos);
  }

  async getCount(query?: string) {
    const count = await this.model.count({
        where: query ? {
            [Op.or]: [{ status: query }, { tipo: query }],
          } : {},
    });
    return count;
  }

  async getSearch(query: string) {
    const protocolos = await this.model.findAll({
      include: [
        {
          model: beneficiarios,
          as: "beneficiarios_cpf_beneficiario",
        },
      ],
      where: {
        [Op.or]: [
          { beneficiarios_cpf: query },
          { n_protocolo: query },
          {
            "$beneficiarios_cpf_beneficiario.nome$": {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });
    return resp(200, "Busca de protocolos feita com sucesso.", protocolos);
  }

  // Adicione outros métodos conforme necessário, por exemplo:
  async getAllByCpf(cpf: string) {
    const protocols = await this.model.findAll({
      where: { beneficiarios_cpf: cpf },
    });
    if (!protocols) {
      return respE(404, "Não foram encontrado protocolos.");
    }
    return resp(200, "Protocolos foram encontrados com sucesso.", protocols);
  }

  async getById(id: string) {
    const protocolo = await this.model.findByPk(id);
    if (!protocolo) {
      return { status: 200, message: "Protocolo não encontrado." };
    }
    return {
      status: 200,
      message: "Protocolo encontrado com sucesso.",
      data: protocolo,
    };
  }

  async getByCpfId(cpf: string, id: string) {
    const protocolo = await this.model.findAll({
      where: { beneficiarios_cpf: cpf, n_protocolo: id },
    });
    if (!protocolo) {
      return { status: 200, message: "Protocolo não encontrado." };
    }
    return {
      status: 200,
      message: "Protocolo encontrado com sucesso.",
      data: protocolo,
    };
  }

  async create(data: protocoloAttributes) {
    const newProtocol = await this.model.create(data);
    return {
      status: 201,
      message: "Protocolo criado com sucesso.",
      data: newProtocol,
    };
  }

  async update(id: number, data: any) {
      console.log(data);
      const [updated] = await this.model.update(data, { where: { n_protocolo: id } });
      if (!updated) {
        
          return respE(404, "Protocol não encontrado.");
      }
      const updatedBeneficiario = await this.model.findByPk(id);
      return resp(200, "Protocol atualizado com sucesso.", updatedBeneficiario);
  }

  // async delete(id: number) {
  //     const deleted = await this.model.destroy({ where: { id } });
  //     if (!deleted) {
  //         return respE(404, "Beneficiário não encontrado.");
  //     }
  //     return resp(200, "Beneficiário deletado com sucesso.", {});
  // }
}

export default ProtocolService;
