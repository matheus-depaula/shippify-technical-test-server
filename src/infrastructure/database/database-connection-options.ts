import { inject, injectable } from 'inversify';
import { Company } from '../../domain/entities/company.entity';
import { Driver } from '../../domain/entities/driver.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { Settings } from '../configurations/settings';

@injectable()
export class DatabaseConnectionOptions {
  public readonly type: 'mysql';
  public readonly host: string;
  public readonly port: number;
  public readonly database: string;
  public readonly username: string;
  public readonly password: string;
  public readonly synchronize: boolean;
  public readonly migrations: string[];
  public readonly cli: { entitiesDir: string; migrationsDir: string };
  public readonly entities: Function[];

  constructor(@inject(Settings) settings: Settings) {
    this.type = 'mysql';
    this.host = settings.getDatabaseHost();
    this.port = settings.getDatabasePort();
    this.database = settings.getDatabaseName();
    this.username = settings.getDatabaseUser();
    this.password = settings.getDatabasePassword();
    this.synchronize = false;
    this.migrations = [`src/infrastructure/database/migrations/*.${settings.getNodeEnv() === 'development' ? 'ts' : 'js'}`];
    this.cli = { entitiesDir: 'src/domain/entities', migrationsDir: 'src/infrastructure/database/migrations' };
    this.entities = [Company, Driver, Vehicle];
  }
}
