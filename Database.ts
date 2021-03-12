import { Connection, ConnectionManager, getConnectionManager } from 'typeorm';
import initDB from './initDB';
import { log } from './utils/logger';

export default class Database {
    private connectionManager: ConnectionManager;

    constructor() {
        this.connectionManager = getConnectionManager();
    }

    public static getConnectionInstance() {
        const db = new this();
        return db.getConnection();
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = 'default';

        let connection: Connection

        if (this.connectionManager.has(CONNECTION_NAME)) {
            log("Database.getConnection() - using existing connection...", "api") 
            connection = await this.connectionManager.get(CONNECTION_NAME)

            if (!connection.isConnected) {
                connection = await connection.connect()
            }
        }
        else {
            log("Database.getConnection() - creating connection...", "api") 
            connection = await initDB();
        }

        return connection;
    }
}
