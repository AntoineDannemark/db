import { getConnection } from 'typeorm';
import { Person } from './index';

// const lightQueryCols = ["id, firstname, lastname, email"];
const fullQueryCols = ["id, firstname, lastname, birthDate, birthPlace, email, gender, bankAccount, bankCode, phone.number, phone.prefix"];

export default async() => {
    await getConnection()
        .createQueryBuilder()
        .select(fullQueryCols)
        .from(Person, "person")
        .leftJoinAndSelect("person.phones","phone")
        .execute()
}
