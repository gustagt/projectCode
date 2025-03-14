import { Router } from "express";
import ProtocolController from "../controllers/protocol.controller";

const  control = new ProtocolController();

const protocolRouter = Router();

protocolRouter.get("/protocolo/cpf/:cpf", control.getAllByCpf.bind(control));
protocolRouter.get("/protocolo/cpf/:cpf", control.getAllByCpf.bind(control));
protocolRouter.get("/protocolo/id/:id", control.getById.bind(control));
protocolRouter.get("/protocolo", control.getAll.bind(control));
protocolRouter.get("/protocolo/search/:search", control.getBySearch.bind(control));


export default protocolRouter
