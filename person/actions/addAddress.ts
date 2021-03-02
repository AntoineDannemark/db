/**
 * @name person/address
 * @method POST
*/

import { Person } from '../Person';
import addressApi, { IAddress } from '../../address/index';
import Database from '../../Database';

export default async ({id, address}: {id: number; address: IAddress}) => {
    let connection = await Database.getConnectionInstance()

    const addressId = await addressApi.create(address)
    await connection
        .createQueryBuilder()
        .relation(Person, "addresses")
        .of(id)
        .add(addressId)

    return { addressId }
}

