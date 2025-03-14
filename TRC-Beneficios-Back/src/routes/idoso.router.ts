import { Router } from "express";

import IdosoController from "../controllers/idoso.controller";

const  control = new IdosoController();

const idosoRouter = Router();

idosoRouter.get("/idoso/:cpf", control.getByCpf.bind(control));
idosoRouter.get("/idoso/pg/:page", control.getAll.bind(control));

export default idosoRouter
