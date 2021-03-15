/**
 * @name persons
 * @method PATCH
*/

import Database from '../../Database';
import { Person } from '../index';

import { log } from '../../utils/logger';

interface UpdatableData {
    firstname?: string;
    lastname?: string;
    birthDate?: string;
    birthPlace?: string;
    email?: string;
    gender?: string;
    bankAccount?: string;
    bankCode?: string;
    comment?: string;    
}

export default async (id: number, updatedData: UpdatableData) => {
    const connection = await Database.getConnectionInstance();

    log("person.updateOne", "api")

    return await connection
        .createQueryBuilder()
        .update(Person)
        .set({ ...updatedData })
        .where("id = :id", { id })
        .execute();
}
