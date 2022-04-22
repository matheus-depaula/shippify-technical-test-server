import { HttpSuccessStatusCode } from '../../../api/http-server/http-status-code.enum';
import { Result } from './result.interface';

export class SuccessResult<T = unknown> implements Result<T> {
  public data?: T;
  public message?: string;
  public status!: HttpSuccessStatusCode;

  constructor(result: SuccessResult<T>) {
    Object.assign(this, result);
  }
}
