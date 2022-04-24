import { injectable } from 'inversify';
import { EntityRepository, getRepository } from 'typeorm';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import {
  databaseRepositoryExistsOptions,
  databaseRepositoryFindByIdOptions,
  databaseRepositoryListOptions,
} from '../database-repository-list-options';
import { EVehicleRelations } from '../enums/vehicle-relations.enum';
import { IDatabaseFilter } from '../interfaces/database-filter.interface';
import { IVehicleWhere } from '../interfaces/vehicle-where.interface';

@injectable()
@EntityRepository(VehicleRepository)
export class VehicleRepository implements IVehicleRepository {
  private readonly repository = getRepository(Vehicle);

  public async save(data: Partial<Vehicle>): Promise<void> {
    console.log('DATABASE ### - Save Vehicle');

    await this.repository.save(data);
  }

  public async list(whereArg?: IVehicleWhere, filterArg?: IDatabaseFilter, relationsArg?: EVehicleRelations[]): Promise<Vehicle[]> {
    console.log('DATABASE ### - List Vehicles');

    const options = databaseRepositoryListOptions(whereArg, filterArg, relationsArg);

    return await this.repository.find(options);
  }

  public async findById(id: number, relationsArg?: EVehicleRelations[], activeOnly: boolean = true): Promise<Vehicle | undefined> {
    console.log('DATABASE ### - Find Vehicle By Id');

    const options = databaseRepositoryFindByIdOptions(id, relationsArg, activeOnly);

    return await this.repository.findOne(options);
  }

  public async exists(key: string, value: string): Promise<boolean> {
    console.log('DATABASE ### - Vehicle Exists');

    const options = databaseRepositoryExistsOptions(key, value);

    return !!(await this.repository.findOne(options));
  }
}
