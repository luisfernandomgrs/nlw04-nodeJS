import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {

    /*
    // 1 2 3 4 5 6 7 8 9 10
    // Detratores => 0 - 6
    // Passivos => 7 - 8
    // Promotores => 9 - 10
    //
    // (Números de promotores - número de detratores) / (número de respondentes) x 100
    */

    async execute(request: Request, response: Response) {

        // não usaremos request.query... 
        // pois será obrigatório ter o ID para pesquisa!
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });


        // Na declaração: detractor = surveysUsers.filter(...);
        // estamos recebendo um array/Select/Lista de todos os votos...
        // Porém, precisamos na verdade do total de "votantes".
        // Neste caso, basta acrescentar ".length" ao final da expressão.
        // ficando assim:
        //
        // const detractor = surveysUsers.filter(...).length;

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const totalAswers = surveysUsers.length;

        const calculate = Number(
            (
                ((promoters - detractor) / totalAswers) * 100
            ).toFixed(2)
        );

        return response.json({
            detractor,
            promoters,
            passive,
            totalAswers,
            nps: calculate
        });
    }
};

export { NpsController };