import { Router } from "express";

import IdosoController from "../controllers/idoso.controller";
import DeficienteController from "../controllers/deficiente.controller";

const  control = new DeficienteController();

const deficienteRouter = Router();

deficienteRouter.get("/deficiente/:cpf", control.getByCpf.bind(control));
deficienteRouter.get("/deficiente/pg/:page", control.getAll.bind(control));


export default deficienteRouter
