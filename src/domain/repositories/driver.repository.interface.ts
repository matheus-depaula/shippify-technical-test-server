import { EDriverRelations } from '../../infrastructure/database/enums/driver-relations.enum';
import { IDatabaseFilter } from '../../infrastructure/database/interfaces/database-filter.interface';
import { IDriverWhere } from '../../infrastructure/database/interfaces/driver-where.interface';
import { Driver } from '../entities/driver.entity';
import { IExtendableRepository } from './extendable.repository.interface';

export interface IDriverRepository extends IExtendableRepository {
  save(data: Partial<Driver>): Promise<void>;
  list(whereArg?: IDriverWhere, filterArg?: IDatabaseFilter, relationsArg?: EDriverRelations[]): Promise<Driver[]>;
  findById(id: number, relationsArg?: EDriverRelations[], activeOnly?: boolean): Promise<Driver | undefined>;
}
