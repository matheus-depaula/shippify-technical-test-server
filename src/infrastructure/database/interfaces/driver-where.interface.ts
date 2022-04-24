import { ICompanyWhere } from './company-where.interface';
import { IExtendableWhere } from './extendable-where.interface';

export interface IDriverWhere extends IExtendableWhere {
  first_name?: string;
  last_name?: string;
  email?: string;
  company?: ICompanyWhere;
}
