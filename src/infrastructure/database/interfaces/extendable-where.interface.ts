import { EEntityStatus } from '../../../domain/enums/entity-status.enum';

export interface IExtendableWhere {
  id?: number;
  status?: EEntityStatus;
}
