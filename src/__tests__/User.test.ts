import { response } from "express";
import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Users", () => {

    // usamos async e await pelo fato de "createConnection()"
    // se tratar de uma Promise... 
    beforeAll( async () => {

        const connection = await createConnection();
        await connection.runMigrations();
    });
    
    it("Should be able to create a new user", async () => {

        // Por nosso request se tratar de uma Promise,
        // precisamos definir como "const response = await..."
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example"
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a user with exists email", async () => {
        
        // Por nosso request se tratar de uma Promise,
        // precisamos definir como "const response = await..."
        const response = await request(app).post("/users").send({email: "user@example.com",name: "User Example"});
        expect(response.status).toBe(400);
    });    
});