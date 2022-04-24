import { EVehicleRelations } from '../../infrastructure/database/enums/vehicle-relations.enum';
import { IDatabaseFilter } from '../../infrastructure/database/interfaces/database-filter.interface';
import { IVehicleWhere } from '../../infrastructure/database/interfaces/vehicle-where.interface';
import { Vehicle } from '../entities/vehicle.entity';
import { IExtendableRepository } from './extendable.repository.interface';

export interface IVehicleRepository extends IExtendableRepository {
  save(data: Partial<Vehicle>): Promise<void>;
  list(whereArg?: IVehicleWhere, filterArg?: IDatabaseFilter, relationsArg?: EVehicleRelations[]): Promise<Vehicle[]>;
  findById(id: number, relationsArg?: EVehicleRelations[], activeOnly?: boolean): Promise<Vehicle | undefined>;
}
