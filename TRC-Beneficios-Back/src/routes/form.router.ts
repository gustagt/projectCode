import { Router } from "express";
import FormController from "../controllers/form.controller";

const  control = new FormController();

const formRouter = Router();

formRouter.post("/formulario/:type", control.create.bind(control));
formRouter.post("/segvia/:type", control.createSegVia.bind(control));

export default formRouter
