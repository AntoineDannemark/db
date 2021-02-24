import personRoutes from './person';
import phoneRoutes from './phone';
// import initDB from './initDB';
import Database from './Database';
import { ConnectionOptions } from './Database';

const api = {
    utils: {
        testDBConnection: async(options: ConnectionOptions) => {
            try {
                let connection = await Database.getConnectionInstance(options);
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