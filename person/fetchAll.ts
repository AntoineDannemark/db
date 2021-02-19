import { getConnection } from 'typeorm';
import { Person } from './index';

const lightQueryCols = ["id, firstname, lastname, email"];
const fullQueryCols = ["id, firstname, lastname, birthDate, birthPlace, email, gender, bankAccount, bankCode"];

export default async() => {
    return await getConnection()
        .createQueryBuilder()
        .select(fullQueryCols)
        .from(Person, "person")
        .execute()
}
