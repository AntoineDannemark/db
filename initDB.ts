import { createConnection } from 'typeorm';

import { log } from './utils/logger';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

import { isCordova, isServerless } from './utils/platforms';

export default async() => {   
    const type = isCordova() ? "cordova" : "better-sqlite3",
        database = isServerless() ? "/mnt/efs/medieval.db" : "medieval.db";

    log(`initDB - will create connection with driver ${type}`, "api");

    return await createConnection({
        type,
        database,
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    });
};