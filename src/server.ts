import "reflect-metadata";
import express from "express";
import "./database/"; // não é necessário informar o arquivo a ser importado... Por padrão ele irá procurar um index.ts
import { router } from "./routes";


const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => console.log("Server is running! Today :)"))