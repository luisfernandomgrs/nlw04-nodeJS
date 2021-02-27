import { Request, Response } from "express"
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
    async execute(request: Request, response: Response) {

        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {

            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const survey = await surveysRepository.findOne({ id: survey_id });

        if (!survey) {
            return response.status(400).json({
                error: "Survey does not exists!"
            });
        }

        // enviar e-mail para p usuário
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        /*
        // o SELECT abaixo foi modificado...
        //
            const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
                where: { user_id: user.id, value: null },
                relations: ["user", "survey"]
            });

        // Para incluir: 1 - ID do usuário
        //               2 - Se não votou
        //               3 - ID da pesquisa
        */
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null, survey_id: survey_id },
            relations: ["user", "survey"],
        });

        const variables = {
            name: user.name,
            title: survey.title,

            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if (surveyUserAlreadyExists) {

            // Caso exista uma pesquisa de satisfação para este usuário
            // recebe o id da pesquisa para uso posterior...
            variables.id = surveyUserAlreadyExists.id;

            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        // salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({

            // user_id é o nome do field na tabela,
            // quando o nome do parâmetro é diferente do nome do fild,
            // é necessário especificar o nome do field;
            // repare que "survey_id" não foi necessário.

            user_id: user.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);
        variables.id = surveyUser.id;

        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController }