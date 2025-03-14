import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";

import { Sequelize } from "sequelize";
import * as config from "./database/config/database";
import { initModels } from "./database/models/init-models";

const db = new Sequelize(config)

initModels(db)

const app = express();


app.use(cors());

app.use(router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction)=>{
    console.log(err)
    res.status(500).json({message: err.message})
}) 

export default app;
