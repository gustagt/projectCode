import { NextFunction, Request, Response } from "express";
import BeneficiariosService from "../service/beneficiarios.service";

class BeneficiariosController {
  private service = new BeneficiariosService();

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, data, message } = await this.service.getAll();
      res.status(status).json({status,message,data});
    } catch (error) {
      next(error);
    }
  }

  // Adicione outros métodos conforme necessário, por exemplo:
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message, data } = await this.service.getById(id);
      res.status(status).json({status,message,data});
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {data: ben} = await this.service.getById(req.body.cpf);
      if(ben){
        return res.status(400).json({status:400,message:"Beneficiário já cadastrado"});
      }
      const { status, message,data } = await this.service.create(req.body);
      res.status(status).json({status,message,data});
    } catch (error) {
      next(error);
    }
  }

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

export default BeneficiariosController;