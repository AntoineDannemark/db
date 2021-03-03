import personRoutes from './person';
import phoneRoutes from './phone';
import addressRoutes from './address';
import Database from './Database';
import fetch from 'cross-fetch';

const api = {
    utils: {
        env: async() => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
            return res;
        },
        testDBConnection: async() => {
            try {
                let connection = await Database.getConnectionInstance();
                return {
                    dbReady: connection.isConnected,
                    error: null,
                }
            } catch(err) {
                return {
                    dbReady: false,
                    error: err,
                }
            }
        },
    },
    person: { ...personRoutes },
    phone: { ...phoneRoutes },
    address: { ...addressRoutes },
}

export type Api = typeof api;
export default api;