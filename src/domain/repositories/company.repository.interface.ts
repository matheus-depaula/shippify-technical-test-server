import { ECompanyRelations } from '../../infrastructure/database/enums/company-relations.enum';
import { ICompanyWhere } from '../../infrastructure/database/interfaces/company-where.interface';
import { IDatabaseFilter } from '../../infrastructure/database/interfaces/database-filter.interface';
import { Company } from '../entities/company.entity';
import { IExtendableRepository } from './extendable.repository.interface';

export interface ICompanyRepository extends IExtendableRepository {
  save(data: Partial<Company>): Promise<void>;
  list(whereArg?: ICompanyWhere, filterArg?: IDatabaseFilter, relationsArg?: ECompanyRelations[]): Promise<Company[]>;
  findById(id: number, relationsArg?: ECompanyRelations[], activeOnly?: boolean): Promise<Company | undefined>;
}
