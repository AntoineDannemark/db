import { getConnection } from 'typeorm';
import { validate } from 'class-validator';
import { Phone, IPhone } from '../index';

export default async ({
   prefix,
   number
}: IPhone) => {    
    let phone = new Phone();
    phone.prefix = prefix;
    phone.number = number;

    const errors = await validate(phone)

    if (errors.length > 0) {
        // TODO better error handling
        throw new Error('validation error')
    } else {
        const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Phone)
            .values(phone)
            .execute()

        return result.raw;
    }
}

