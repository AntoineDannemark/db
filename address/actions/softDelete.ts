/**
 * @name address/softDelete
 * @method POST
*/

import Database from '../../Database';
import { Address } from '../Address';

export default async (id: number) => {    
    let connection = await Database.getConnectionInstance()
    
    const res =  await connection
        .createQueryBuilder()
        .softDelete()
        .from(Address)
        .where("id = :id", { id })
        .execute()

    return res;
}
