import { getConnection } from 'typeorm';
import { Person } from './index';

// const lightQueryCols = ["id, firstname, lastname, email"];
// const fullQueryCols = ["id, firstname, lastname, birthDate, birthPlace, email, gender, bankAccount, bankCode"];

export default async() => {
    await getConnection()
        .createQueryBuilder()
        .select("person")
        .from(Person, "person")
        .leftJoinAndSelect("person.phones","phone")
        .execute()
}
