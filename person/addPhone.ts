import { getConnection } from 'typeorm';
import { validate } from 'class-validator';
import { Person } from './index';
import { Phone, IPhone } from '../phone/index';

export default async (id: number, { prefix, number }: IPhone) => {    
    let phone = new Phone()
    phone.prefix = prefix;
    phone.number = number;

    console.log(id, phone)

    const errors = await validate(phone)

    if (errors.length > 0) {
        // TODO better error handling
        throw new Error('validation error')
    } else {
        return await getConnection()
            .createQueryBuilder()
            .relation(Person,  "phones")
            .of(id)
            .add(phone)
    }
}

