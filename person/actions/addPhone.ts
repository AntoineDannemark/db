/**
 * @name person/phone
 * @method POST
*/

import { Person } from '../Person';
import phoneApi from '../../phone/index';
import Database from '../../Database';

/**
 * Adds a phone number to a person
 * @param {number} id - the id of the person
 * @param {IPhone} phone - the phone number to create
 */
export default async ({ id, phone }) => {
    let connection = await Database.getConnectionInstance()

    const phoneId = await phoneApi.create(phone)
    await connection
        .createQueryBuilder()
        .relation(Person, "phones")
        .of(id)
        .add(phoneId)

    return { phoneId }
}

