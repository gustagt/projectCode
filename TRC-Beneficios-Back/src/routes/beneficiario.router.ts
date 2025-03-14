import { Router } from "express";
import BeneficiariosController from "../controllers/beneficiario.controller";

const  control = new BeneficiariosController();

const beneficiariosRouter = Router();

beneficiariosRouter.get("/beneficiarios", control.getAll.bind(control));
beneficiariosRouter.get("/beneficiarios/:id", control.getById.bind(control));
beneficiariosRouter.post("/beneficiarios", control.create.bind(control));

export default beneficiariosRouter
