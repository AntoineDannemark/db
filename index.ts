import personRoutes from './person';
import phoneRoutes from './phone';
import Database from './Database';

// Ici si sls 

const api = {
    utils: {
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
    phone: { ...phoneRoutes }
}

export type Api = typeof api;
export default api;