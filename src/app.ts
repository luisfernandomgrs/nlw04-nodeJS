import "reflect-metadata";
import express, { NextFunction } from "express";
import "express-async-errors";
import createConnection from "./database"; // não é necessário informar o arquivo a ser importado... Por padrão ele irá procurar um index.ts
import { router } from "./routes";
import { AppError } from "./errors/AppError";

createConnection();

const app = express();

app.use(express.json());
app.use(router);

app.use((errorCatch: Error, request: Request, response: Response, _next: NextFunction) => {
    if (errorCatch instanceof AppError) {
        return response.status(errorCatch.statusCode).json({
            message: errorCatch.message
        });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${errorCatch.message}`,
    });
}
);

export { app };