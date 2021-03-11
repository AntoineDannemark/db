import personRoutes from './person';
import addressRoutes from './address';
import phoneRoutes from './phone';
import utilsRoutes from './utils';

const slsApi = {
    // -start - don't remove this comment used to generate api codeaddress: {},
	person: {
		addAddress: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person/address', {method:'POST', body: JSON.stringify(args)}),
		addPhone: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person/phone', {method:'POST', body: JSON.stringify(args)}),
		create: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person', {method:'POST', body: JSON.stringify(args)}),
		fetchAll: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/persons', {method:'GET', body: JSON.stringify(args)}),
		softDelete: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/person/softDelete', {method:'POST', body: JSON.stringify(args)})
	},
	phone: {},
	utils: {
		testConnection: async (...args: any[]) => await fetch('https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev/api/utils/test', {method:'GET', body: JSON.stringify(args)})
	}
// don't remove this comment used to generate api code -end
}

const api = {    
    utils: { ...utilsRoutes },
    person: { ...personRoutes },
    address: { ...addressRoutes },
    phone: { ...phoneRoutes }
}

export type Api = typeof api;
export default api;