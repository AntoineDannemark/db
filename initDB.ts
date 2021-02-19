import { createConnection } from 'typeorm';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

type platform = "sqlite" | "cordova"

export default async(platform: platform) => {
    return await createConnection({
        type: platform,
        database: "ioreel.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    }).then(async connection => {       
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