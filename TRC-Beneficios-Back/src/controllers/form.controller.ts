import { NextFunction, Request, Response } from "express";
import BeneficiariosService from "../service/beneficiarios.service";
import ProtocolService from "../service/protocol.service";

import { beneficiariosAttributes } from "./../interfaces/IBeneficios";
import { protocoloAttributes } from "./../interfaces/IProtocol";
import { validateOne } from "../utils/validate";
import path from "path";
import fs from "fs";
import { protocolo } from "./../database/models/protocolo";
import IdosoService from "../service/idoso.service";
import DeficienteService from "../service/deficiente.service";
import RecadastrosService from "../service/recadastro.service";
import Mail from "../smtp/config/mail";

const caminho = path.resolve("documentos");

interface IForm {
  beneficiario: beneficiariosAttributes;
  entregaCrd: number;
  files: {
    docSol: { name: string; type: string; data: string }[];
    docResp: { name: string; type: string; data: string }[];
    compEnd: { name: string; type: string; data: string }[];
    laudo: { name: string; type: string; data: string }[];
  };
}

interface ISegVia {
  cpf: number;
  email: string;
  entregaCrd: number;

}


class FormController {
  private serviceB = new BeneficiariosService();
  private serviceP = new ProtocolService();
  private serviceI = new IdosoService();
  private serviceD = new DeficienteService();
  private serviceR = new RecadastrosService();

  async create(req: Request, res: Response, next: NextFunction) {
    const { type } = req.params;

    try {
      const now = new Date();
      const dataAtual = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      );
      const { beneficiario: retBeneficiario, entregaCrd }: IForm = req.body;



      const { data: beneficiario } = await this.serviceB.getById(
        retBeneficiario.cpf.toString()
      );

      const { data: email } = await this.serviceB.getByEmail(
        retBeneficiario.email
      );

      let credencial;

      if (type === "Deficiente") {
        const result = await this.serviceD.getByCpf(
          retBeneficiario.cpf.toString()
        );
        credencial = result.data;
      } else if (type === "Idoso") {
        const result = await this.serviceI.getByCpf(
          retBeneficiario.cpf.toString()
        );
        credencial = result.data;
      }

      let ret;

      if (beneficiario) {
        const { data: protocols } = await this.serviceP.getAllByCpf(
          retBeneficiario.cpf.toString()
        );

        ret = await validateOne(
          beneficiario,
          credencial,
          protocols,
          type,
          dataAtual
        );

        if (!ret.pass)
          return res.status(400).json({ status: 400, message: ret.error });
        if (beneficiario.email !== retBeneficiario.email && email)
          return res.status(400).json({
            status: 400,
            message: "E-mail inserido ja está sendo utilizado.",
          });
        // const {data: ben} = await this.serviceB.update(retBeneficiario);
      } else {
        if (email)
          return res.status(400).json({
            status: 400,
            message: "E-mail inserido ja está sendo utilizado.",
          });
        const { data: ben } = await this.serviceB.create(retBeneficiario);
      }

      const newProtocolo: protocoloAttributes = {
        beneficiarios_cpf: retBeneficiario.cpf,
        status: "Aguardando Analise",
        servico: ret?.recadastro
          ? "Recadastro para credencial"
          : "Solicitação para Credencial",
        data_analise: dataAtual,
        tipo: type,
        entrega_crd: entregaCrd,
      };

      const { data: protocolo } = await this.serviceP.create(newProtocolo);

      const caminhoDoc = path.join(caminho, String(protocolo.n_protocolo));

      if (!fs.existsSync(caminhoDoc)) {
        fs.mkdirSync(caminhoDoc, { recursive: true });
      }

      const cpfPath = path.join(
        caminho,
        "credenciais",
        String(Number(retBeneficiario.cpf))
      );

      if (!fs.existsSync(cpfPath)) {
        fs.mkdirSync(cpfPath, { recursive: true });
      }
      const formattedDate = dataAtual
        .toISOString()
        .replace(/T/, "_")
        .replace(/:/g, "-")
        .split(".")[0];

      // files.docSol.map((file, i) => {
      //   const fileExtension = path.extname(file.name).slice(1);
      //   const base64Data = file.data.replace(/^data:image\/\w+;base64,/, "");
      //   const buffer = Buffer.from(base64Data, "base64");
      //   const filePath = path.join(
      //     caminhoDoc,
      //     `${formattedDate}-DocOficial-${i}.${fileExtension}`
      //   );
      //   fs.writeFileSync(filePath, buffer);
      // });
      // files.compEnd.map((file, i) => {
      //   const fileExtension = path.extname(file.name).slice(1);
      //   const base64Data = file.data.replace(/^data:image\/\w+;base64,/, "");
      //   const buffer = Buffer.from(base64Data, "base64");
      //   const filePath = path.join(
      //     caminhoDoc,
      //     `${formattedDate}-END-${i}.${fileExtension}`
      //   );
      //   fs.writeFileSync(filePath, buffer);
      // });
      // if (retBeneficiario.representante_legal) {
      //   files.docResp.map((file, i) => {
      //     const fileExtension = path.extname(file.name).slice(1);
      //     const base64Data = file.data.replace(/^data:image\/\w+;base64,/, "");
      //     const buffer = Buffer.from(base64Data, "base64");
      //     const filePath = path.join(
      //       caminhoDoc,
      //       `${formattedDate}-DocResponsavel-${i}.${fileExtension}`
      //     );
      //     fs.writeFileSync(filePath, buffer);
      //   });
      // }
      // if (type === "Deficiente") {
      //   files.laudo.map((file, i) => {
      //     const fileExtension = path.extname(file.name).slice(1);
      //     const base64Data = file.data.replace(/^data:image\/\w+;base64,/, "");
      //     const buffer = Buffer.from(base64Data, "base64");
      //     const filePath = path.join(
      //       caminhoDoc,
      //       `${formattedDate}-LaudoPerificial-${i}.${fileExtension}`
      //     );
      //     fs.writeFileSync(filePath, buffer);
      //   });
      // }

      // if (credencial) {
      //   const { data: rec } = await this.serviceR.getOneByCred(
      //     credencial.n_credencial,
      //     type
      //   );
      //   if (rec) {
      //     if (rec.recadastro_1 === null)
      //       rec.recadastro_1 = dataAtual.toString();
      //     else if (rec.recadastro_2 === null)
      //       rec.recadastro_2 = dataAtual.toString();
      //     else if (rec.recadastro_3 === null)
      //       rec.recadastro_3 = dataAtual.toString();
      //     if (rec.recadastro_4 === null)
      //       rec.recadastro_4 = dataAtual.toString();
      //     await this.serviceR.update(credencial.n_credencial, type, rec);
      //   }
      // }
      Mail.to = retBeneficiario.email;
      Mail.subject = `Beneficios - Solitação de Credencial de Estacionamento- Aberto`;
      Mail.message =
        type === "Deficiente"
          ? `<style>
        p{margin: 0;}
    </style>
    <p>N° do protocolo: <strong>${protocolo.n_protocolo}</strong></p><br>
    <p>Sua solicitação de Credencial para Deficiente foi registrada com sucesso!</p>
    <p>Para acompanhar o processo acesse: <a href="https://apps.transcon.contagem.mg.gov.br/beneficios/consulta">AQUI</a></p>
    <p>Em caso de alguma dúvida mande um email para <a href="mailto:beneficios.transcon@contagem.mg.gov.br">beneficios.transcon@contagem.mg.gov.br</a>
        .</p>
    <br>
    <strong>NÃO RESPONDA ESSE EMAIL.</strong>`
          : `<style>
        p{margin: 0;}
    </style>
       <p>N° do protocolo: <strong>${protocolo.n_protocolo}</strong></p><br>
    <p>Sua solicitação de Credencial para Idoso foi registrada com sucesso!</p>
    <p>Para acompanhar o processo acesse: <a href="https://apps.transcon.contagem.mg.gov.br/beneficios/consulta">AQUI</a></p>
    <p>Em caso de alguma dúvida mande um email para <a href="mailto:beneficios.transcon@contagem.mg.gov.br">beneficios.transcon@contagem.mg.gov.br</a>
        .</p>
    <br>
    <strong>NÃO RESPONDA ESSE EMAIL.</strong>`;
      Mail.sendMail();

      res.status(200).json({
        status: 200,
        message: "Solicitação de credencial registrada com sucesso.",
        data: protocolo,
      });
    } catch (error) {
      next(error);
    }
  }

  async createSegVia(req: Request, res: Response, next: NextFunction) {
    try {
     const { type } = req.params;


      const now = new Date();
      const dataAtual = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      );

      const {  cpf, email, entregaCrd }: ISegVia = req.body;

      let credencial;

      if (type === "Deficiente") {
        const result = await this.serviceD.getByCpf(
          cpf.toString()
        );
        credencial = result.data;
      } else if (type === "Idoso") {
        const result = await this.serviceI.getByCpf(
         cpf.toString()
        );
        credencial = result.data;
      }

      if(!credencial){
        return res.status(400).json({
          status: 400,
          message: "Credencial não encontrada.",
        });
      }

      
      const newProtocolo: protocoloAttributes = {
        beneficiarios_cpf: cpf,
        status: "Aguardando Analise",
        servico:"Segunda via",
        data_analise: dataAtual,
        tipo: type,
        entrega_crd: entregaCrd,
      };

      const { data: protocolo } = await this.serviceP.create(newProtocolo);

      const caminhoDoc = path.join(caminho, String(protocolo.n_protocolo));

      if (!fs.existsSync(caminhoDoc)) {
        fs.mkdirSync(caminhoDoc, { recursive: true });
      }

      const cpfPath = path.join(
        caminho,
        "credenciais",
        String(Number(cpf))
      );

      if (!fs.existsSync(cpfPath)) {
        fs.mkdirSync(cpfPath, { recursive: true });
      }


      Mail.to = email;
      Mail.subject = `Beneficios - Solitação de Credencial de Estacionamento- Aberto`;
      Mail.message =
        type === "Deficiente"
          ? `<style>
        p{margin: 0;}
    </style>
    <p>N° do protocolo: <strong>${protocolo.n_protocolo}</strong></p><br>
    <p>Sua solicitação de Credencial para Deficiente foi registrada com sucesso!</p>
    <p>Para acompanhar o processo acesse: <a href="https://apps.transcon.contagem.mg.gov.br/beneficios/consulta">AQUI</a></p>
    <p>Em caso de alguma dúvida mande um email para <a href="mailto:beneficios.transcon@contagem.mg.gov.br">beneficios.transcon@contagem.mg.gov.br</a>
        .</p>
    <br>
    <strong>NÃO RESPONDA ESSE EMAIL.</strong>`
          : `<style>
        p{margin: 0;}
    </style>
       <p>N° do protocolo: <strong>${protocolo.n_protocolo}</strong></p><br>
    <p>Sua solicitação de Credencial para Idoso foi registrada com sucesso!</p>
    <p>Para acompanhar o processo acesse: <a href="https://apps.transcon.contagem.mg.gov.br/beneficios/consulta">AQUI</a></p>
    <p>Em caso de alguma dúvida mande um email para <a href="mailto:beneficios.transcon@contagem.mg.gov.br">beneficios.transcon@contagem.mg.gov.br</a>
        .</p>
    <br>
    <strong>NÃO RESPONDA ESSE EMAIL.</strong>`;
      Mail.sendMail();

      res.status(200).json({
        status: 200,
        message: "Solicitação de segunda via registrada com sucesso.",
        data: protocolo,
      });

    } catch (error) {
      next(error);
    }
  }
}

export default FormController;
