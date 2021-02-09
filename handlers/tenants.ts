import { getConnection } from 'typeorm';
import { Tenant } from '../entities/Tenant';

const fetchTenants = async() => {
    return await getConnection()
        .createQueryBuilder()
        .select("id, firstname, lastname")
        .from(Tenant, "tenant")
        .execute()
}

interface tenantData {
    firstname: string; 
    lastname: string;
}

const createTenant = async(tenant: tenantData) => {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Tenant)
        .values(tenant)
        .execute()
};

const updateTenant = async(id: number, { firstname, lastname }: tenantData) => {
    return await getConnection()
        .createQueryBuilder()
        .update(Tenant)
        .set({ firstname, lastname })
        .where("id = :id", { id })
        .execute()
}

const removeTenant = async(id: number) => {
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