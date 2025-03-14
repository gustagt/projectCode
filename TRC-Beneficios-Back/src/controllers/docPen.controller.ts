import { NextFunction, Request, Response } from "express";

import DocPenService from "../service/docPen.service";
import ProtocolService from "../service/protocol.service";
class DocPenController {
  private service = new DocPenService();
  private serviceP = new ProtocolService();



  async getByCpf(req: Request, res: Response, next: NextFunction) {
    try {
      const cpf = req.params.cpf;
      const { status, message, data } = await this.service.getByCpf(cpf!.toString());

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
   async putById(req: Request, res: Response, next: NextFunction) {
 
    try {
      const { id } = req.params;

      const { docPen } = req.body;
      const { protocol } = req.body; 
      const { data } = await this.service.update(Number(id), docPen);
      const { status, message, data: protocoloRet } = await this.serviceP.getById(protocol.id);
      protocoloRet?.set("status",protocol.status).save();
  
      res.status(status).json({status,message,data});
    } catch (error) {
      next(error);
    }
  }
  

  // Adicione outros métodos conforme necessário, por exemplo:


}

export default DocPenController;
