import { Router } from "express";
import ProtocolController from "../controllers/protocol.controller";
import DocPenController from "../controllers/docPen.controller";

const  control = new DocPenController();

const docPenRouter = Router();

docPenRouter.get("/docPen/cpf/:cpf", control.getByCpf.bind(control));
docPenRouter.put("/docPen/id/:id", control.putById.bind(control));


export default docPenRouter
