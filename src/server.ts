import express, { response } from 'express';

const app = express();

/**
 * GET => Buscar
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração especifica
 */

// http://localhost:3333/users <= users refere-se à rota que será utilizada...
// app.get("/users", (request, response) => {
app.get("/", (request, response) => {

    // return response.send("Hello World - NLW04");
    return response.json({ message: "Hello World - NLW04" })
});

// 1 param => Rota(Recurso API)
// 2 param => request, response

app.post("/", (request, response) => {

    // Ao chamar o método, geralmente receberemos algum dado...
    // Vamos imaginar que já recebemos os dados que serão armazenados...
    return response.json({ message: "Os dados foram salvos com sucesso! - NLW04" })
});

app.listen(3333, () => console.log("Server is running! :)"))