import { injectable } from 'inversify';
import { Body, Delete, Get, Path, Post, Put, Query, Response, Route, Tags } from 'tsoa';
import { CreateCompanyDto } from '../../../application/company/create-company/create-company.dto';
import { DisableCompanyDto } from '../../../application/company/disable-company/disable-company.dto';
import { FindCompanyByIdDto } from '../../../application/company/find-company-by-id/find-company-by-id.dto';
import { ListCompaniesDto } from '../../../application/company/list-companies/list-companies.dto';
import { ECompanyPlanType } from '../../../domain/enums/company-plan-type.enum';
import { EEntityStatus } from '../../../domain/enums/entity-status.enum';
import { EOrderType } from '../../../infrastructure/database/enums/order-type.enum';
import { IErrorMessage, resultHandler } from '../../../application/contracts/results/result.handler';
import { HttpClientErrorStatusCode, HttpServerErrorStatusCode, HttpSuccessStatusCode } from '../http-status-code.enum';
import { ExtendableController } from './extendable.controller';
import { CreatedResult } from '../../../application/contracts/results/created-result';
import { NoContentResult } from '../../../application/contracts/results/no-content-result';
import { UpdateCompanyDto } from '../../../application/company/update-company/update-company.dto';

@injectable()
@Tags('Company')
@Route('company')
export class CompanyController extends ExtendableController {
  /**
   * @summary List companies
   */
  @Get()
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async listCompanies(
    @Query() name?: string,
    @Query() city?: number,
    @Query() status: EEntityStatus = EEntityStatus.ACTIVE,
    @Query() planType?: ECompanyPlanType,
    @Query() take?: number,
    @Query() skip?: number,
    @Query() orderBy?: string,
    @Query() orderType?: EOrderType,
    @Query() activeOnly: boolean = true
  ) {
    const dto = new ListCompaniesDto({
      where: { name, city, status: activeOnly ? EEntityStatus.ACTIVE : status, plan_type: planType },
      filter: { take, skip, orderBy, orderType },
    });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Find company by id
   */
  @Get('/{id}')
  @Response<IErrorMessage>(HttpClientErrorStatusCode.NOT_FOUND)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async getCompanyById(@Path() id: number, @Query() activeOnly: boolean = true) {
    const dto = new FindCompanyByIdDto({ id, activeOnly });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Creates a new company
   */
  @Post()
  @Response<CreatedResult>(HttpSuccessStatusCode.CREATED)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async createCompany(@Body() body: CreateCompanyDto) {
    const dto = new CreateCompanyDto(body);
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Updates a company by it's id
   */
  @Put('/{id}')
  @Response<NoContentResult>(HttpSuccessStatusCode.NO_CONTENT)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async updateCompany(@Path() id: number, @Body() body: Omit<UpdateCompanyDto, 'id'>) {
    const dto = new UpdateCompanyDto({ ...body, id });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Disable a company by it's id
   */
  @Delete('/{id}')
  @Response(HttpSuccessStatusCode.NO_CONTENT)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async disableCompany(@Path() id: number) {
    const dto = new DisableCompanyDto({ id });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }
}
