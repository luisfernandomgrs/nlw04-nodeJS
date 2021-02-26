import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars"; // nativo do node.JS
import fs from "fs"; // nativo do node.JS

class SendMailService {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then((account) => {

            // Create a SMTP transporter object
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, variables: object, path: string) {

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({

            // caso o nome da propriedade seja diferente do nome do parâmetro
            // use <prpriedade>: <nome_parametro>
            // Ex.: html: body,

            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>"
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

//export { SendMailService }
export default new SendMailService();