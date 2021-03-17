/**
 * @name person/phone
 * @method POST
*/

import { Person } from '../Person';
import phoneApi, { IPhone } from '../../phone/index';
import Database from '../../Database';

/**
 * Adds a phone number to a person
 * @param {number} id - the id of the person
 * @param {IPhone} phone - the phone number to create
 */
export default async ({ id, phone, dbName }: { id: number; phone: IPhone }) => {
    let connection = await Database.getConnectionInstance(dbName)

    const phoneId = await phoneApi.create(phone)
    await connection
        .createQueryBuilder()
        .relation(Person, "phones")
        .of(id)
        .add(phoneId)

    return { phoneId }
}

