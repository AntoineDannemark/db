import { Endpoint } from "../../../features/User/userSlice";

export default async (isElectron: boolean): Promise<Endpoint | Error> => {
    try {
        let endpoint: Endpoint = {
            dbHosting: undefined,
            slsEndpoint: undefined,
        };

        if (isElectron) {
            const Store = require('electron-store');

            endpoint.dbHosting = await new Store().get('dbHosting');            
            endpoint.slsEndpoint = await new Store().get('slsEndpoint');            
        } else {
            const Storage = require('@capacitor/core').Plugins.Storage;   
                     
            const dbHosting = await Storage.get({ key: 'dbHosting' }).value;
            const slsEndpoint = await Storage.get({ key: 'slsEndpoint' }).value;

            endpoint.dbHosting = dbHosting;
            endpoint.slsEndpoint = slsEndpoint;
        }
        return endpoint;
    } catch(err) {
        throw new Error(err)
    } 
}