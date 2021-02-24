import { createConnection } from 'typeorm';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

import { platform } from './Database';

export default async(isServerless: boolean, platform: platform) => {
    return await createConnection({
        type: platform,
        database: isServerless ? "/mnt/efs/medieval.db" : "medieval.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    });
}