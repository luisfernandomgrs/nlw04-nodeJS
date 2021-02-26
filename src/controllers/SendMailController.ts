import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class SendMailController {
    async execute(request: Request, response: Response) {

        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (!userAlreadyExists) {

            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id });

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists!"
            });
        }

        // salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({

            // user_id é o nome do field na tabela,
            // quando o nome do parâmetro é diferente do nome do fild,
            // é necessário especificar o nome do field;
            // repare que "survey_id" não foi necessário.

            user_id: userAlreadyExists.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);

        // enviar e-mail para p usuário

        return response.json(surveyUser);
    }
}

export { SendMailController }