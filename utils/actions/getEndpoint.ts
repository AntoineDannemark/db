export default async (isElectron: boolean): Promise<void> => {
    if (isElectron) {
            const Store = require('electron-store');
            const store = new Store();

            // TODO Check return value + use for async
            return await store.get('dbEndpoint');
    } else {
        const Storage = require('@capacitor/core').Plugins.Storage;
        
        const { value } = await Storage.get({ key: 'dbEndpoint' });
        
        return value;
    }
}