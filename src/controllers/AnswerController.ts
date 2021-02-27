import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    // http://localhost:3333/answers/10?=u53509e50-10c1-40c3-abcc-7439ff968c3b
    /*
    // Route Params => Parametros que compõe a rota, ou seja: Faz parte da rota, precedidos por uma barra "/"
    //                 Os nome de parêmtros são sempre identificados após os dois pontos.
    //    
    //                          |-------- --> Nome do parâmetro
    // routes.get("/answers/:value")
    //                 | ---------------- -->  Nome do recurso  
    //
    // Query Params => Busca, Paginação <<- Não são obrigatórios
    //                 Sempre virão após um ponto de interrogação...
    //    -->  ?
    // chave=valor
    */

    async execute(request: Request, response: Response) {

        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {

            // Ao invés de usarmos a classe Error nativa desta forma:
            // throw new Error()
            // Vamos fazer usando nossa classe personalizada,
            // Que já possui valores padr
            throw new AppError("Survey User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
};

export { AnswerController };