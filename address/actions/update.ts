/**
 * @name address/update
 * @method POST
*/

import Database from '../../Database';
import { IAddress } from '../../address/index';
import { Address } from '../Address';

export default async ({id, address}: {id: number; address: IAddress})  => {    
    let connection = await Database.getConnectionInstance()
    
    const res =  await connection
        .createQueryBuilder()
        .update(address)
        .from(Address)
        .where("id = :id", { id })
        .execute()

    return res;
}
