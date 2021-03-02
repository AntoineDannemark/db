import { getConnection } from 'typeorm';
import { validate } from 'class-validator';
import { Address, IAddress } from '../index';

export default async ({
    street,
    number,
    city,
    zip,
    country
}: IAddress) => {    
    let address = new Address();
    address.street = street;
    address.number = number;
    address.city = city;
    address.zip = zip;
    address.country = country;

    const errors = await validate(address)

    if (errors.length > 0) {
        // TODO better error handling
        throw new Error('validation error')
    } else {
        const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Address)
            .values(address)
            .execute()

        return result.raw;
    }
}

