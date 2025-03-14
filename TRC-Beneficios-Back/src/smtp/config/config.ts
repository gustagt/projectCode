import "dotenv/config";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = process.env;
class Configs {
    public host = MAIL_HOST || "";
    public port = Number(MAIL_PORT);
    public user = MAIL_USER || "";
    public password = MAIL_PASSWORD|| "";
}

export default new Configs;