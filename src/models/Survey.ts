import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("surveys")
class Survey {

    @PrimaryColumn() readonly id: string;

    // se o nome da coluna for diferente da propriedade, informe no parâmetro de @Column()
    @Column() title: string;

    @Column() description: string;

    @CreateDateColumn() created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Survey }