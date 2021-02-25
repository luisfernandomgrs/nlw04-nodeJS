import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {

    // pega todas as informações que estão em ormconfig.json... 
    // Como default para usar aqui
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test' ? "./src/database/database.test.sqlite" : defaultOptions.database
        })
    );
};