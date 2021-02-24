import { Connection, ConnectionManager, getConnectionManager } from 'typeorm';
import initDB from './initDB';

export type platform = "cordova" | "better-sqlite3"

export default class Database {
    private connectionManager: ConnectionManager;
    private isServerless: boolean;
    private platform: platform;

    constructor(isServerless: boolean, platform: platform) {
        this.connectionManager = getConnectionManager();
        this.isServerless = isServerless;
        this.platform = platform;
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = 'default';

        let connection: Connection

        if (this.connectionManager.has(CONNECTION_NAME)) {
            console.log(`Database.getConnection()-using existing connection ...`)
            connection = await this.connectionManager.get(CONNECTION_NAME)

            if (!connection.isConnected) {
                connection = await connection.connect()
            }
        }
        else {
            console.log(`Database.getConnection()-creating connection ...`);

            connection = await initDB(this.isServerless, this.platform);
        }

        return connection;
    }
}
