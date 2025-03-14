import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const  control = new AuthController();

const authRouter = Router();

authRouter.post("/login", control.login.bind(control));

export default authRouter
