import { NextFunction, Request, Response } from "express";

import multer from "multer";
import path from "path";

class UploadsController {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "documentos/" + req.params.id);
    },

    filename: function (req, file, cb) {
      const fieldName = file.fieldname; // Nome do campo do input
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      cb(null, `${fieldName}-${timestamp}${ext}`);
    },
  });

  upload = multer({ storage: this.storage });

  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json({ status: 200, message: "Arquivo enviado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default UploadsController;
