import { ECompanyPlanType } from '../../../domain/enums/company-plan-type.enum';
import { IExtendableWhere } from './extendable-where.interface';

export interface ICompanyWhere extends IExtendableWhere {
  name?: string;
  city?: number;
  plan_type?: ECompanyPlanType;
}
