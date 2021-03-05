import Database from '../../Database';

export interface TestResponse {
    dbReady: boolean;
    error: Error | null;
}

export default async(): Promise<TestResponse> => {
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
};