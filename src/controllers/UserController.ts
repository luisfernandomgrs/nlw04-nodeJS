import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppError";

class UserController {
    async create(request: Request, response: Response) {

        const { name, email } = request.body;

        // Caso não queira, não há obrigatoriedade de informar
        // a mensagem de validação, caso seja inválido.
        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório!"),
            email: yup.string().email().required("E-mail não pode ser vazio!")
        });

        try {
            // abortEarly: false
            // Permite que seja executado todas as validações,
            // sem interromper o fluxo, caso a primeira seja negada.

            await schema.validate(request.body, { abortEarly: false });
        }
        catch (event_error) {
            throw new AppError(event_error);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        // usando o status 201, quando desejamos informar
        // algo como "Create"
        return response.status(201).json(user);
    }
}

export { UserController };
