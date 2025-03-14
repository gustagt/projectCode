import { ModelStatic } from "sequelize";
import { resp, respE } from "../utils/resp";

import { documentos_pendentes } from "../database/models/documentos_pendentes";


class DocPenService {
    
    private model: ModelStatic<documentos_pendentes> = documentos_pendentes;

    async getByCpf(cpf: string) {
        const doc = await this.model.findOne({where: {beneficiarios_cpf: cpf}});
        if (!doc) {
            return respE(404, "Não foram encontrado documentos pendentes.");
        }
        return resp(200, "Documentos pendentes foram encontrados com sucesso.", doc);
    }

    async create(data: documentos_pendentes) {
        const doc = await this.model.create(data);
        return resp(201, "Documento pendente criado com sucesso.", doc);
    }

    async update(id: number, data: any) {
        const [updated] = await this.model.update(data, { where: { id: id } });

        if (!updated) {
            return respE(404, "Documento pendente não encontrado.");
        }
        const updatedDoc = await this.model.findOne({where: {id: id}});
        return resp(200, "Documento pendente atualizado com sucesso.", updatedDoc);
    }
}

export default DocPenService;