import { getConnection } from 'typeorm';
import { Tenant } from '../entities/Tenant';

const fetchTenants = async() => {
    return await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(Tenant)
        .execute()
}

const createTenant = async(tenant) => {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Tenant)
        .values(tenant)
        .execute()
};

const updateTenant = async(id, data) => {
    return await getConnection()
        .createQueryBuilder()
        .update(Tenant)
        .set({...data})
        .where("id = :id", { id })
        .execute()
}

const removeTenant = async(id) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .from(Tenant)
        .where("id = :id", { id })
        .execute();
};

export default {
    fetchTenants,
    createTenant,
    updateTenant,
    removeTenant,
}