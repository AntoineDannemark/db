export default async (isElectron: boolean): Promise<string> => {
    if (isElectron) {
            const Store = require('electron-store');

            return await new Store().get('dbEndpoint');
    } else {
        const Storage = require('@capacitor/core').Plugins.Storage;
        
        const { value } = await Storage.get({ key: 'dbEndpoint' });
        
        return value;
    }
}