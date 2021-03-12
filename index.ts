import fetch from 'cross-fetch';

import { log } from './utils/logger';

import personRoutes from './person';
import phoneRoutes from './phone';
import utilsRoutes from './utils';

const fetchGet = async (actionUrl: any, params: any) => {
	let url = new URL(actionUrl);
	url.search = new URLSearchParams(params[0]).toString();
	return fetch(url.toString()).then(r => r.json());
};

const headers = {
    Accept: "application/json",
};

const getSlsApi = (endpoint: string) => {
    log("getSlsAPi - client connecting to serverless database", "api")
    return {
            // -start - don't remove this comment used to generate api codeaddress: {},
	person: {
		addAddress: async (...args: any[]) => await fetch(`${endpoint}/api/person/address`, {method:'POST', headers, body: JSON.stringify(args[0])}).then(r => r.json()),
		addPhone: async (...args: any[]) => await fetch(`${endpoint}/api/person/phone`, {method:'POST', headers, body: JSON.stringify(args[0])}).then(r => r.json()),
		create: async (...args: any[]) => await fetch(`${endpoint}/api/person`, {method:'POST', headers, body: JSON.stringify(args[0])}).then(r => r.json()),
		fetchAll: async (...args: any[]) => await fetchGet(`${endpoint}/api/persons`, args),
		softDelete: async (...args: any[]) => await fetch(`${endpoint}/api/person/softDelete`, {method:'POST', headers, body: JSON.stringify(args[0])}).then(r => r.json())
	},
	phone: {},
	utils: {
		testConnection: async (...args: any[]) => await fetchGet(`${endpoint}/api/utils/test`, args)
	}
// don't remove this comment used to generate api code -end
    }
}

const localApi = {    
    utils: { ...utilsRoutes },
    person: { ...personRoutes },
    phone: { ...phoneRoutes }
}

export const getApi = (endpoint: string) => endpoint === "local" 
    ? localApi
    : getSlsApi(endpoint);
