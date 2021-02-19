import personRoutes from './person';
import phoneRoutes from './phone';
import initDB from './initDB';

const api = {
    initDB, 
    person: { ...personRoutes },
    phone: { ...phoneRoutes }
}

export type Api = typeof api;
export default api;