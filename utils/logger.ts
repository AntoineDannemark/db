import { isServerless, isElectronMain } from './platforms';
// Prefix logs with [api]
// Cordova logs to the console, 
// electron logs 
// 

export const log = (value: string, prefix: string) => {
    // Includes electron and mobile apps that 
    if (isServerless()) {
        // TODO Check greg
        return console.log(`[${prefix}] - ${value}`);
    } else if (isElectronMain()) {
        const log = require('electron-log');

        return log.info(`[${prefix}] - ${value}`);
       // Renderer logs will appear in the console per default, use console.log
    } 

    return console.log(`[${prefix}] - ${value}`);
}

