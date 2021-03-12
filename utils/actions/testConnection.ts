/**
 * @name utils/test
 * @method GET
*/

import Database from '../../Database';

import { log } from '../logger';

export interface TestResponse {
    dbReady: boolean;
    error: Error | null;
}

export default async(): Promise<TestResponse> => {
    try {
        let connection = await Database.getConnectionInstance();
        
        log("test connection success", "api"); 

        return {
            dbReady: connection.isConnected,
            error: null,
        }
    } catch(err) {
        log(`test connection failure: ${err.message}`, "api"); 
        
        return {
            dbReady: false,
            error: err,
        }
    }
};