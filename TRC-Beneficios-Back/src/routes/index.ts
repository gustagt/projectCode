import { Router } from "express";
import beneficiarioRouter from "./beneficiario.router";
import loginRouter from "./auth.router";
import AuthController from '../controllers/auth.controller';
import formRouter from "./form.router";
import protocolRouter from "./protocol.router";
import idosoRouter from "./idoso.router";
import deficienteRouter from "./deficiente.router";
import docPenRouter from "./docPen.router";

import bodyParser from "body-parser";
import uploadsRouter from "./uploads.router";

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const router = Router()
const authControl = new AuthController();

router.use(jsonParser, loginRouter)
router.use(authControl.authenticate.bind(authControl))
router.use(urlencodedParser,formRouter)
router.use(jsonParser,beneficiarioRouter)
router.use(jsonParser,protocolRouter)
router.use(jsonParser,idosoRouter)
router.use(jsonParser,deficienteRouter)
router.use(jsonParser,docPenRouter)
router.use(uploadsRouter)



export default router