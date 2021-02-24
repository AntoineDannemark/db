import { createConnection } from 'typeorm';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

import { ConnectionOptions } from './Database';

export default async(options: ConnectionOptions) => {
    return await createConnection({
        type: options.platform,
        database: options.isServerless ? "/mnt/efs/medieval.db" : "medieval.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    });
}