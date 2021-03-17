/**
 * @name persons
 * @method GET
*/

import Database from '../../Database';
import { Person } from '../index';

// const lightQueryCols = ["id, firstname, lastname, email"];
// const fullQueryCols = ["p.id, p.firstname, p.lastname, p.birthDate, p.birthPlace, p.email, p.gender, p.bankAccount, p.bankCode, phone.number, phone.prefix"];

export default async ({ dbName }) => {
    let connection = await Database.getConnectionInstance(dbName)

    return await connection
        .createQueryBuilder()
        .select("person")
        .from(Person, "person")
        .leftJoinAndSelect("person.phones", "ph")
        .leftJoinAndSelect("person.addresses", "a")
        // .select(["pe.id", "pe.firstname", "pe.lastname", "ph.prefix", "ph.number"])
        .getMany()
}
