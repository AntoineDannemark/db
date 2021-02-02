import { getConnection } from 'typeorm';
import { Tenant } from '../entities/Tenant';

const fetchPeople = async() => {
    return await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(Tenant)
        .execute()
}

const createPerson = async(tenant) => {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Tenant)
        .values(tenant)
        .execute()
};

const updatePerson = async(id, data) => {
    return await getConnection()
        .createQueryBuilder()
        .update(Tenant)
        .set({...data})
        .where("id = :id", { id })
        .execute()
}

const removePerson = async(id) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .from(Tenant)
        .where("id = :id", { id })
        .execute();
};

export default {
    fetchPeople,
    createPerson,
    updatePerson,
    removePerson,
}