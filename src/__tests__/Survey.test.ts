import { response } from "express";
import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Surveys", () => {

    // usamos async e await pelo fato de createConnection
    // se tratar de uma Promise
    beforeAll( async () => {

        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a  new survey", async () => {

        // // Por nosso request se tratar de uma Promise,
        // // precisamos definir const response = await...
        const response = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example"
        });

        expect(response.status).toBe(201);
        
        // // verifica se o objeto retornado possui uma propriedade especifica para satisfazer o teste.
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => { 
        await request(app).post("/surveys").send({title: "Title Example 2", description: "Description Example 2"});
        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);
    });
});