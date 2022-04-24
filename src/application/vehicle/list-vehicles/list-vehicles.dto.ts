import { IDatabaseFilter } from '../../../infrastructure/database/interfaces/database-filter.interface';
import { IVehicleWhere } from '../../../infrastructure/database/interfaces/vehicle-where.interface';

export class ListVehiclesDto {
  public readonly where?: IVehicleWhere;
  public readonly filter?: IDatabaseFilter;

  constructor(dto: ListVehiclesDto) {
    Object.assign(this, dto);
  }
}
