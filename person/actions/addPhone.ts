import { getConnection } from 'typeorm';
import { Person } from '../Person';
import phoneApi, { IPhone } from '../../phone/index';

export default async (id: number, phone: IPhone) => {    
    const phoneId = await phoneApi.create(phone)
    return await getConnection()
        .createQueryBuilder()
        .relation(Person,  "phones")
        .of(id)
        .add(phoneId)    
}

