import personRoutes from './person';
import phoneRoutes from './phone';
import utilsRoutes from './utils';

const api = {    
    utils: { ...utilsRoutes },
    person: { ...personRoutes },
    phone: { ...phoneRoutes }
}

export type Api = typeof api;
export default api;