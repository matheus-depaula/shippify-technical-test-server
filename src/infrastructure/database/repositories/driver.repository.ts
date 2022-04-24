import { injectable } from 'inversify';
import { EntityRepository, getRepository } from 'typeorm';
import { Driver } from '../../../domain/entities/driver.entity';
import { IDriverRepository } from '../../../domain/repositories/driver.repository.interface';
import {
  databaseRepositoryExistsOptions,
  databaseRepositoryFindByIdOptions,
  databaseRepositoryListOptions,
} from '../database-repository-list-options';
import { EDriverRelations } from '../enums/driver-relations.enum';
import { IDatabaseFilter } from '../interfaces/database-filter.interface';
import { IDriverWhere } from '../interfaces/driver-where.interface';

@injectable()
@EntityRepository(DriverRepository)
export class DriverRepository implements IDriverRepository {
  private readonly repository = getRepository(Driver);

  public async save(data: Partial<Driver>): Promise<void> {
    console.log('DATABASE ### - Save Driver');

    await this.repository.save(data);
  }

  public async list(whereArg?: IDriverWhere, filterArg?: IDatabaseFilter, relationsArg?: EDriverRelations[]): Promise<Driver[]> {
    console.log('DATABASE ### - List Drivers');

    const options = databaseRepositoryListOptions(whereArg, filterArg, relationsArg);

    return await this.repository.find(options);
  }

  public async findById(id: number, relationsArg?: EDriverRelations[], activeOnly: boolean = true): Promise<Driver | undefined> {
    console.log('DATABASE ### - Find Driver By Id');

    const options = databaseRepositoryFindByIdOptions(id, relationsArg, activeOnly);

    return await this.repository.findOne(options);
  }

  public async exists(key: string, value: string): Promise<boolean> {
    console.log('DATABASE ### - Driver Exists');

    const options = databaseRepositoryExistsOptions(key, value);

    return !!(await this.repository.findOne(options));
  }
}
