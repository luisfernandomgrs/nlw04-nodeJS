import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
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

        // url: '/answers/9?=ud3a62255-22d9-4157-a0ed-e902d2a76883',        
        console.log("request OLHE AQUI...");
        console.log(u);
        console.log(request.query);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            return response.status(400).json({
                error: "Survey User does not exists!"
            })
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
};

export { AnswerController };