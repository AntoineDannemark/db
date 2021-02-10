import { createConnection } from 'typeorm';
import { Tenant } from './entities/Tenant';
import { People } from './entities/People';
import tenantHandlers from './handlers/tenants';
import peopleHandlers from './handlers/people';

type platform = "sqlite" | "cordova"

const initDB = async(platform: platform) => {
    return await createConnection({
        type: platform,
        database: "ioreel.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Tenant, People],
    }).then(connection => {
        return {
            dbReady: connection.isConnected,
            error: null,
        }
    }).catch(err => {
        return {
            dbReady: false,
            error: err,
        }
    })
}

export const api = {
    initDB,
    ...tenantHandlers,
    ...peopleHandlers,
}
