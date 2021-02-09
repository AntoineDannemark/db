import { getConnection } from 'typeorm';
import { Tenant } from '../entities/Tenant';

const fetchTenants = async() => {
    return await getConnection()
        .createQueryBuilder()
        .select("id, firstname, lastname")
        .from(Tenant, "tenant")
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

const updateTenant = async(id, { firstname, lastname }) => {
    return await getConnection()
        .createQueryBuilder()
        .update(Tenant)
        .set({ firstname, lastname })
        .where("id = :id", { id })
        .execute()
}

const removeTenant = async(id) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .from(Tenant, "tenant")
        .where("tenant.id = :id", { id })
        .execute();
};

export default {
    fetchTenants,
    createTenant,
    updateTenant,
    removeTenant,
}