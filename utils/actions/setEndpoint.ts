export default async (endpoint: string, isElectron: boolean): Promise<void> => {
    if (isElectron) {
        const Store = require('electron-store');

        const store = new Store();

        // TODO Check return value + use for async
        return await store.set('dbEndpoint', endpoint);
    } else {
        const Storage = require('@capacitor/core').Plugins.Storage;
        
        // TODO Check return value
        return await Storage.set({key: 'dbEndpoint', value: endpoint})
    }
        
}