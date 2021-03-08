/**
 * @name person
 * @method DELETE
*/

import Database from '../../Database';
import { Person } from '../Person';

export default async (id: number) => {    
    let connection = await Database.getConnectionInstance()
    
    const res =  await connection
        .createQueryBuilder()
        .softDelete()
        .from(Person)
        .where("id = :id", { id })
        .execute()

    return res;
}
