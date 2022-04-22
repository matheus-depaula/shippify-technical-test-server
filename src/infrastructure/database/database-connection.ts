import { inject, injectable } from 'inversify';
import { Connection, createConnection } from 'typeorm';
import DatabaseConnectionOptions from './database-connection-options';

@injectable()
export class DatabaseConnection {
  private connection?: Connection;

  @inject(DatabaseConnectionOptions)
  private typeormConnectionOptions!: DatabaseConnectionOptions;

  public async getConnection(): Promise<Connection> {
    console.log('DATABASE ### - Creating connection');

    if (this.connection?.isConnected) return this.connection;

    this.connection = await createConnection(this.typeormConnectionOptions);

    return this.connection;
  }

  public async closeConnection(): Promise<void> {
    console.log('DATABASE ### - Closing connection');

    if (this.connection?.isConnected) await this.connection.close();
  }
}
