import { injectable } from 'inversify';
import { Connection } from 'typeorm';
import { apiHandler } from './api/api.handler';
import { databaseHandler } from './infrastructure/database/database.handler';

@injectable()
export class MainHandler {
  constructor(private _apiHandler: Promise<void> = apiHandler(), private _databaseHandler: Promise<Connection> = databaseHandler()) {}

  public async start() {
    await this._apiHandler;
    await this._databaseHandler;
  }
}
