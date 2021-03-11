import personRoutes from './person';
import phoneRoutes from './phone';
import utilsRoutes from './utils';
import storageApi from './../storage';
import { isPlatform } from '@ionic/react';

const endpoint = storageApi.getEndpoint(isPlatform("electron"))

let api;

const fetchGet = async (actionUrl: any, params: any) => {
	let url = new URL(actionUrl);
	url.search = new URLSearchParams(params[0]).toString();
	return fetch(url.toString()).then(r => r.json());
};

const getSlsApi = (endpoint: string) => {
    return {
            // -start - don't remove this comment used to generate api codeaddress: {},
            person: {
                addAddress: async (...args: any[]) => await fetch(`${endpoint}/person/address`, {method:'POST', body: JSON.stringify(args)}).then(r => r.json()),
                addPhone: async (...args: any[]) => await fetch(`${endpoint}/person/phone`, {method:'POST', body: JSON.stringify(args)}).then(r => r.json()),
                create: async (...args: any[]) => await fetch(`${endpoint}/person`, {method:'POST', body: JSON.stringify(args)}).then(r => r.json()),
                fetchAll: async (...args: any[]) => await fetchGet(`${endpoint}/persons`, args),
                softDelete: async (...args: any[]) => await fetch(`${endpoint}/person/softDelete`, {method:'POST', body: JSON.stringify(args)}).then(r => r.json())
            },
            phone: {},
            utils: {
                testConnection: async (...args: any[]) => await fetchGet(`${endpoint}/utils/test`, args)
            }
        // don't remove this comment used to generate api code -end
    }
}

const localApi = {    
    utils: { ...utilsRoutes },
    person: { ...personRoutes },
    phone: { ...phoneRoutes }
}

api = endpoint === "local" ? localApi : getSlsApi(endpoint);

export type Api = typeof api;
export default api;