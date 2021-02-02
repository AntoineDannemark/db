import { createConnection } from 'typeorm';
import { People } from './entities/People';
import { Tenant } from './entities/Tenant';
import { Address } from './entities/Address';
import { Phone } from './entities/Phone';
import peopleHandlers from './handlers/people';

const initDB = async(platform) => {
    return await createConnection({
        type: platform,
        database: "ioreel.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [People, Tenant, Address, Phone],
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
    ...peopleHandlers,
}
