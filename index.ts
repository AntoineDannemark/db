import personRoutes from './person';
import phoneRoutes from './phone';
import utilsRoutes from './utils';

const fetchGet = async (actionUrl, params) => {
	let url = new URL(actionUrl);

	url.search = new URLSearchParams(params[0]).toString();

	return fetch(url).then(r => r.json());
};

const api = {
	utils: { ...utilsRoutes },
	person: { ...personRoutes },
	phone: { ...phoneRoutes }
}

const slsApi = {
	// -start - don't remove this comment used to generate api codeaddress: {},
	person: {
		addAddress: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person/address', {method:'POST', body: JSON.stringify(args)}).then(r => r.json()),
		addPhone: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person/phone', {method:'POST', body: JSON.stringify(args)}).then(r => r.json()),
		create: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person', {method:'POST', body: JSON.stringify(args)}).then(r => r.json()),
		fetchAll: async (...args: any[]) => await fetchGet('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/persons', args),
		softDelete: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person/softDelete', {method:'POST', body: JSON.stringify(args)}).then(r => r.json())
	},
	phone: {},
	utils: {
		testConnection: async (...args: any[]) => await fetchGet('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/utils/test', args)
	}
// don't remove this comment used to generate api code -end
}

export type Api = typeof api;
export default api;