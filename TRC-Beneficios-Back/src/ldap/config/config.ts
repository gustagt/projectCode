import "dotenv/config";

const { AD_USER, AD_PASS, AD_DOMAIN, AD_CONTROLLER, AD_HOST } = process.env;

const config = {
  url: AD_HOST || "urlad",
  baseDN: `DC=${AD_DOMAIN},DC=${AD_CONTROLLER}`,
  bindDN: AD_USER || "caminhoUser",
  bindCredentials: AD_PASS,
};

export default config;
