import { injectable } from 'inversify';
import { Controller, Get, Response, Route, Tags } from 'tsoa';
import { ErrorResult } from '../../../application/contracts/results/error-result.interface';
import { SuccessResult } from '../../../application/contracts/results/success-result';
import { HttpServerErrorStatusCode, HttpSuccessStatusCode } from '../http-status-code.enum';

@injectable()
@Tags('API')
@Route('/api/health-check')
export class HealthCheckController extends Controller {
  /**
   * @summary Check API status
   */
  @Get()
  @Response<SuccessResult>(HttpSuccessStatusCode.SUCCESS)
  @Response<ErrorResult>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async healthCheck(): Promise<SuccessResult> {
    this.setStatus(HttpSuccessStatusCode.SUCCESS);

    return new SuccessResult({ status: HttpSuccessStatusCode.SUCCESS, message: 'API Ok' });
  }
}
