import "dotenv/config";
import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_SECRET_TI } = process.env;

const encode = (data: any) => {
  const token = jwt.sign(
    {
      data,
    },
    JWT_SECRET || "dev",
    {
      expiresIn: "6d",
    }
  );

  return token;
};

const decode = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET || "dev");
    return decoded;
};

export default {
  encode,
  decode,
};
