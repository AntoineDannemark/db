import { Person } from './index';
import database from "../../testConnection";

// const lightQueryCols = ["id, firstname, lastname, email"];
// const fullQueryCols = ["p.id, p.firstname, p.lastname, p.birthDate, p.birthPlace, p.email, p.gender, p.bankAccount, p.bankCode, phone.number, phone.prefix"];

export default async () => {
    const co = await database.getConnection();

    return await co.getRepository(Person)
        .createQueryBuilder("pe")
        .leftJoinAndSelect("pe.phones", "ph")
        // .select(["pe.id", "pe.firstname", "pe.lastname", "ph.prefix", "ph.number"])
        .getMany()
}
