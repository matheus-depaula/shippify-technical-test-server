import { EVehicleType } from '../../../domain/enums/vehicle-type.enum';
import { IDriverWhere } from './driver-where.interface';
import { IExtendableWhere } from './extendable-where.interface';

export interface IVehicleWhere extends IExtendableWhere {
  plate?: string;
  model?: string;
  type?: EVehicleType;
  capacity?: string;
  driver?: IDriverWhere;
}
