import { Endpoint } from './../../../features/User/userSlice';
export default async (
    endpoint: Endpoint,
    isElectron: boolean
): Promise<true | Error> => {
    let { dbHosting, slsEndpoint } = endpoint;

    try {
        if (isElectron) {
            const Store = require('electron-store');
    
            const store = new Store();
    
            await store.set('dbHosting', dbHosting);
            await store.set('slsEndpoint', slsEndpoint);
        } else {
            const Storage = require('@capacitor/core').Plugins.Storage;
            
            await Storage.set({key: 'dbHosting', value: dbHosting})
            await Storage.set({key: 'slsEndpoint', value: slsEndpoint})
        }     
        return true;  
    } catch (err) {
        throw new Error(err)
    }
}