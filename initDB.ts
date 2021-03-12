import { createConnection } from 'typeorm';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

export default async(isLocalEndpoint: boolean, isCordova: boolean) => {   
    const type = isLocalEndpoint && isCordova ? "cordova" : "better-sqlite3",
        database = isLocalEndpoint ? "medieval.db": "/mnt/efs/medieval.db";

    return await createConnection({
        type,
        database,
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    });
};