import { getConnection } from 'typeorm';
import { Person } from '../Person';
import phoneApi, { IPhone } from '../../phone/index';

/**
 * Adds a phone number to a person
 * @param {number} id - the id of the person
 * @param {IPhone} phone - the phone number to create
 */
export default async (id: number, phone: IPhone) => {    
    const phoneId = await phoneApi.create(phone)
    return await getConnection()
        .createQueryBuilder()
        .relation(Person,  "phones")
        .of(id)
        .add(phoneId)    
}

