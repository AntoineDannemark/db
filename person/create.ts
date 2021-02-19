import { getConnection } from 'typeorm';
import { validate } from 'class-validator';
import { Person, IPerson } from './index';

export default async ({
    firstname,
    lastname,
    birthDate,
    birthPlace,
    email,
    gender,
    bankAccount,
    bankCode,
    comment,
}: IPerson) => {    
    let person = new Person();
    person.firstname = firstname;
    person.lastname = lastname;
    person.birthDate = birthDate;
    person.birthPlace = birthPlace;
    person.email = email;
    person.gender = gender;
    person.bankAccount = bankAccount;
    person.bankCode = bankCode;
    person.comment = comment;
    person.phones = [];
    person.addresses = [];

    const errors = await validate(person)

    if (errors.length > 0) {
        // TODO better error handling
        throw new Error('validation error')
    } else {
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Person)
            .values(person)
            .execute()
    }
}

