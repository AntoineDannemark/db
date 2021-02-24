import { isPlatform } from '@ionic/react';
import { createConnection } from 'typeorm';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

export default async() => {   
    const isServerless = !!+process.env.IS_SLS!;

    const type = !isServerless && isPlatform("cordova") ? "cordova" : "better-sqlite3";
    const database = isServerless ? "/mnt/efs/medieval.db" : "medieval.db";

    return await createConnection({
        type,
        database,
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    });
}