import { HttpClientErrorStatusCode } from '../http-status-code.enum';
import { ExtendableError } from './extendable-error';

export class HttpClientError extends ExtendableError<HttpClientErrorStatusCode> {
  constructor(result: HttpClientError) {
    super();

    Object.assign(this, result);
  }
}
