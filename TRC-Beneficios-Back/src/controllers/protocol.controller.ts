import { NextFunction, Request, Response } from "express";
import ProtocolService from "../service/protocol.service";

class ProtocolController {
  private service = new ProtocolService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, query } = req.query;


      const { status, data, message } = await this.service.getAll(page!.toString(), query?.toString());
      const count = await this.service.getCount(query?.toString());
      res.status(status).json({ status, message, data, pages: Math.ceil(count / 14) });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { cpf } = req.body;
      const { status, message, data } = await this.service.getById(id);

      if (cpf !== data?.beneficiarios_cpf) {
        return res.status(403).json({
          status: 403,
          message: "CPF do beneficiário não corresponde ao protocolo",
          data: null,
        });
      }
      res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  } 
  async getBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.params;
      const { status, message, data } = await this.service.getSearch(search);

      res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  }
  async getByCpfId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.query.id;
      const cpf = req.query.cpf;
      const { status, message, data } = await this.service.getByCpfId(cpf!.toString(),id!.toString());

      if (!data) {
        return res.status(403).json({
          status: 404,
          message: "Dados não encotrado.",
          data: null,
        });
      }
      res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  }

  // Adicione outros métodos conforme necessário, por exemplo:
  async getAllByCpf(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.params;
      const { status, message, data } = await this.service.getAllByCpf(cpf);
      res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  }

}

export default ProtocolController;
