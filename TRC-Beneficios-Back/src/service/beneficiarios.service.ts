import { ModelStatic } from "sequelize";
import { resp, respE } from "../utils/resp";
import { beneficiarios } from "../database/models/beneficiarios";
import { beneficiariosAttributes } from "../interfaces/IBeneficios";


class BeneficiariosService {
    
    private model: ModelStatic<beneficiarios> = beneficiarios;

    async getAll() {
  
        const beneficiarios = await this.model.findAll();
        return resp(200, "Busca de beneficiários feita com sucesso.", beneficiarios);
    }

    // Adicione outros métodos conforme necessário, por exemplo:
    async getById(id: string) {
        const beneficiario = await this.model.findByPk(id);
        if (!beneficiario) {
            return {status: 200, message: "Beneficiário não encontrado."};
        }
        return {status: 200, message:  "Beneficiário encontrado com sucesso.", data: beneficiario};
    }

    async getByEmail(email: string) {
        const beneficiario = await this.model.findOne({where: {email: email}});
        if (!beneficiario) {
            return {status: 200, message: "Beneficiário não encontrado."};
        }
        return {status: 200, message:  "Beneficiário encontrado com sucesso.", data: beneficiario};
    }
    async create(data: beneficiariosAttributes) {
        const newBeneficiario = await this.model.create(data);
        return resp(201, "Beneficiário criado com sucesso.", newBeneficiario);
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

export default BeneficiariosService;