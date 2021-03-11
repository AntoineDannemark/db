/**
 * @name address/update
 * @method POST
*/

import Database from '../../Database';
import { IAddress } from '../../address/index';
import { Address } from '../Address';

export default async ({id, address}: {id: number; address: IAddress})  => {    
    let connection = await Database.getConnectionInstance()
    // const log = require('electron-log'); // Temp

    // log.info(address);
    
    const res =  await connection
        .createQueryBuilder()
        .update(Address)
        .set(address)
        .where("id = :id", { id })
        .execute()

    return res;
}
