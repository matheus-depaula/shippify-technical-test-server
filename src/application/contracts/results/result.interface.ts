import { HttpSuccessStatusCode } from '../../../api/http-server/http-status-code.enum';

export interface Result<T = undefined> {
  data?: T;
  message?: string;
  status: HttpSuccessStatusCode;
}
