import { createConnection } from 'typeorm';

import { Person } from './person';
import { Address } from './address';
import { Phone } from './phone';

export default async (name) => {
    let isServerless = !!+process.env.IS_SLS!,
        type: "cordova" | "better-sqlite3";

    try {
        // If module exists, we are in React for mobile
        const isPlatform = require('@ionic/react').isPlatform;
        type = !isServerless && isPlatform("cordova") ? "cordova" : "better-sqlite3";
    } catch (err) {
        // If error, we are either on electron or SLS
        type = "better-sqlite3"
    }

    const database = isServerless ? `/mnt/efs/${name}.db` : "medieval.db";

    return await createConnection({
        type,
        database,
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [Person, Address, Phone],
    });
}