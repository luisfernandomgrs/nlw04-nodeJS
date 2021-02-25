import "reflect-metadata";
import express from "express";
import createConnection from "./database"; // não é necessário informar o arquivo a ser importado... Por padrão ele irá procurar um index.ts

import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());
app.use(router);

export { app };