import { Connection, ConnectionManager, getConnectionManager } from 'typeorm';
import initDB from './initDB';

export default class Database {
    private connectionManager: ConnectionManager;

    constructor() {
        this.connectionManager = getConnectionManager();
    }

    public static getConnectionInstance(name) {
        const ci = new this();
        Object.assign(ci)
        return ci.getConnection(name);
    }

    public async getConnection(name): Promise<Connection> {
        const CONNECTION_NAME = name;

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

            connection = await initDB(name);
        }

        return connection;
    }
}
