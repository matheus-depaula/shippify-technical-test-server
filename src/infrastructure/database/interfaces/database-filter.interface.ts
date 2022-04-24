import { EOrderType } from '../enums/order-type.enum';

export interface IDatabaseFilter {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderType?: EOrderType;
}
