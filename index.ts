import personRoutes from './person';
import phoneRoutes from './phone';
// import initDB from './initDB';
import Database from './Database';
import { platform } from './Database';

const api = {
    utils: {
        testDBConnection: async(isServerless: boolean, platform: platform) => {
            try {
                let connection = await new Database(isServerless, platform).getConnection();
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