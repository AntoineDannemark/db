/**
 * @name address
 * @method GET
*/

import Database from '../../Database';
import { Address } from '../index';

export default async () => {
    let connection = await Database.getConnectionInstance()

    return await connection
        .createQueryBuilder()
        .select("address")
        .from(Address, "address")
        .getMany()
}
