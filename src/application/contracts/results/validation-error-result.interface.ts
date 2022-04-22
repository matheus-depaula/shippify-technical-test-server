import { FieldErrors } from 'tsoa';
import { ErrorResult } from './error-result.interface';

export interface ValidationErrorResult extends ErrorResult {
  details: FieldErrors;
}
