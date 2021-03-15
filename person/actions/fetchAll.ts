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
        .from(Person, "p")
        .leftJoinAndSelect("p.phones", "ph")
        .leftJoinAndSelect("p.addresses", "a")
        .select([
            "p.id", 
            "p.uuid",
            "p.firstname", 
            "p.lastname", 
            "p.birthDate", 
            "p.birthPlace", 
            "p.email", 
            "p.gender",
            "p.bankAccount",
            "p.bankCode",
            "ph.prefix", 
            "ph.number"
        ])
        .getMany()
        // .then(res => {
        //     let result = [];
        //     res.forEach(r => {
        //         // log(JSON.stringify(r), "api")
        //         // log(typeof r, "api")
        //         result.push(Object.assign({}, r))
        //     });

        //     return result;
        // });
            
}
