import { ICompanyWhere } from '../../../infrastructure/database/interfaces/company-where.interface';
import { IDatabaseFilter } from '../../../infrastructure/database/interfaces/database-filter.interface';

export class ListCompaniesDto {
  public readonly where?: ICompanyWhere;
  public readonly filter?: IDatabaseFilter;

  constructor(dto: ListCompaniesDto) {
    Object.assign(this, dto);
  }
}
