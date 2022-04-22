import * as Types from '../../../infrastructure/configurations/types';
import { inject, injectable } from 'inversify';
import { Controller, Get, Response, Route, Tags } from 'tsoa';
import { CreateCompanyDto } from '../../../application/company/create-company/create-company.dto';
import { ErrorResult } from '../../../application/contracts/results/error-result.interface';
import { SuccessResult } from '../../../application/contracts/results/success-result';
import { Mediator } from '../../../application/mediator';
import { HttpClientErrorStatusCode, HttpSuccessStatusCode } from '../http-status-code.enum';

@injectable()
@Tags('Company')
@Route('company')
export class CompanyController extends Controller {
  constructor(@inject(Types.Mediator) private mediator: Mediator) {
    super();
  }

  /**
   * @summary Creates a new Company
   */
  @Get()
  @Response(HttpSuccessStatusCode.CREATED)
  @Response<ErrorResult>(HttpClientErrorStatusCode.BAD_REQUEST)
  public async createCompany(): Promise<any> {
    const dto = new CreateCompanyDto('Teste');

    const handlerResult = await this.mediator.send(dto);

    this.setStatus(HttpSuccessStatusCode.CREATED);

    return {};
  }
}
