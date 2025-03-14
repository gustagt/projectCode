import { NextFunction, Request, Response } from "express";
import BeneficiariosService from "../service/beneficiarios.service";
import IdosoService from "../service/idoso.service";
import DeficienteService from './../service/deficiente.service';

class DeficienteController {
  private service = new DeficienteService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page } = req.params;
      const { status, data, message } = await this.service.getAll(page);
      res.status(status).json({status,message,data});
    } catch (error) {
      next(error);
    }
  }

  // Adicione outros métodos conforme necessário, por exemplo:
  async getByCpf(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.params;
      const { status, message, data } = await this.service.getByCpf(cpf);
      res.status(status).json({status,message,data});
    } catch (error) {
      next(error);
    }
  }

    //   async create(req: Request, res: Response, next: NextFunction) {
    //     try {
    //       const { status, message,data } = await this.service.create(req.body);
    //       res.status(status).json({status,message,data});
    //     } catch (error) {
    //       next(error);
    //     }
    //   }

  // async update(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const { status, data } = await this.service.update(Number(id), req.body);
  //     res.status(status).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const { status, data } = await this.service.delete(Number(id));
  //     res.status(status).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default DeficienteController;