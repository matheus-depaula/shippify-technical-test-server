import { HttpServerErrorStatusCode } from '../http-status-code.enum';
import { ExtendableError } from './extendable-error';

export class HttpServerError extends ExtendableError<HttpServerErrorStatusCode> {
  constructor(result: HttpServerError) {
    super();

    Object.assign(this, result);
  }
}
