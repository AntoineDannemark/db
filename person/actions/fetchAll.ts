/**
 * @name persons
 * @method GET
*/

import Database from '../../Database';
import { Person } from '../index';

import { log } from '../../utils/logger';

// const lightQueryCols = ["id, firstname, lastname, email"];
// const fullQueryCols = ["p.id, p.firstname, p.lastname, p.birthDate, p.birthPlace, p.email, p.gender, p.bankAccount, p.bankCode, phone.number, phone.prefix"];

export default async () => {
    let connection = await Database.getConnectionInstance()

    log("person.fetchAll", "api")

    return await connection
        .createQueryBuilder()
        .select("person")
        .from(Person, "person")
        .leftJoinAndSelect("person.phones", "ph")
        .leftJoinAndSelect("person.addresses", "a")
        // .select(["pe.id", "pe.firstname", "pe.lastname", "ph.prefix", "ph.number"])
        .getMany()
}
