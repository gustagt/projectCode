import { Router } from "express";
import UploadsController from "../controllers/uploads.controller";

const control = new UploadsController();

const uploadsRouter = Router();
const uploadFields = [
  { name: "laudo", maxCount: 4 },
  { name: "docSol", maxCount: 4 },
  { name: "compEnd", maxCount: 4 },
  { name: "docResp", maxCount: 4 },
  { name: "boletim", maxCount: 4 },
  { name: "outros", maxCount: 4 },
];

uploadsRouter.post(
  "/uploads/:id",
  control.upload.fields(uploadFields),
  control.uploadFile.bind(control)
);

export default uploadsRouter;
