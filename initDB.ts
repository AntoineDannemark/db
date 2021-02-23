import { createConnection } from 'typeorm';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

type platform = "sqlite" | "cordova" | "better-sqlite3"

const initDB = async (platform: platform) => {
    return await createConnection({
        type: platform,
        database: "/mnt/efs/medieval.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    }).then(async connection => {
        if (platform === "better-sqlite3") {
            return connection;
        }

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

export default initDB;