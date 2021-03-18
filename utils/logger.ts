import { isServerless, isElectronMain } from './platforms';

export const log = (value: string, prefix: string) => {
    if (isServerless()) {
        // TODO Check greg
        return console.log(`[${prefix}] - ${value}`);
    } else if (isElectronMain()) {
        try {
            const log = require('electron-log');

            return log.info(`[${prefix}] - ${value}`);
        } catch (err) {
            return console.log(`[${prefix}] - ${value}`);
        }
    } 

    return console.log(`[${prefix}] - ${value}`);
}

