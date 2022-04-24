import { IDatabaseFilter } from '../../../infrastructure/database/interfaces/database-filter.interface';
import { IDriverWhere } from '../../../infrastructure/database/interfaces/driver-where.interface';

export class ListDriversDto {
  public readonly where?: IDriverWhere;
  public readonly filter?: IDatabaseFilter;

  constructor(dto: ListDriversDto) {
    Object.assign(this, dto);
  }
}
