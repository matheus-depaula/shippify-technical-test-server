import { injectable } from 'inversify';
import { Body, Delete, Get, Path, Post, Put, Query, Response, Route, Tags } from 'tsoa';
import { ECompanyPlanType } from '../../../domain/enums/company-plan-type.enum';
import { EEntityStatus } from '../../../domain/enums/entity-status.enum';
import { EOrderType } from '../../../infrastructure/database/enums/order-type.enum';
import { IErrorMessage, resultHandler } from '../../../application/contracts/results/result.handler';
import { HttpClientErrorStatusCode, HttpServerErrorStatusCode, HttpSuccessStatusCode } from '../http-status-code.enum';
import { ExtendableController } from './extendable.controller';
import { CreatedResult } from '../../../application/contracts/results/created-result';
import { NoContentResult } from '../../../application/contracts/results/no-content-result';
import { ListDriversDto } from '../../../application/driver/list-drivers/list-drivers.dto';
import { CreateDriverDto } from '../../../application/driver/create-driver/create-driver.dto';
import { FindDriverByIdDto } from '../../../application/driver/find-driver-by-id/find-driver-by-id.dto';
import { DisableDriverDto } from '../../../application/driver/disable-driver/disable-driver.dto';
import { UpdateDriverDto } from '../../../application/driver/update-driver/update-driver.dto';

@injectable()
@Tags('Driver')
@Route('driver')
export class DriverController extends ExtendableController {
  /**
   * @summary List drivers
   */
  @Get()
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async listDrivers(
    @Query() firstNme?: string,
    @Query() lastName?: string,
    @Query() status: EEntityStatus = EEntityStatus.ACTIVE,
    @Query() companyId?: number,
    @Query() companyCity?: number,
    @Query() companyStatus: EEntityStatus = EEntityStatus.ACTIVE,
    @Query() companyPlanType?: ECompanyPlanType,
    @Query() take?: number,
    @Query() skip?: number,
    @Query() orderBy?: string,
    @Query() orderType?: EOrderType,
    @Query() activeOnly: boolean = true
  ) {
    const dto = new ListDriversDto({
      where: {
        first_name: firstNme,
        last_name: lastName,
        status: activeOnly ? EEntityStatus.ACTIVE : status,
        company: {
          id: companyId,
          city: companyCity,
          status: activeOnly ? EEntityStatus.ACTIVE : companyStatus,
          plan_type: companyPlanType,
        },
      },
      filter: { take, skip, orderBy, orderType },
    });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Find driver by id
   */
  @Get('/{id}')
  @Response<IErrorMessage>(HttpClientErrorStatusCode.NOT_FOUND)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async getDriverById(@Path() id: number, @Query() company: boolean = false, @Query() activeOnly: boolean = true) {
    const dto = new FindDriverByIdDto({ id, company, activeOnly });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Creates a new driver
   */
  @Post()
  @Response<CreatedResult>(HttpSuccessStatusCode.CREATED)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async createDriver(@Body() body: CreateDriverDto) {
    const dto = new CreateDriverDto(body);
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Updates a driver by it's id
   */
  @Put('/{id}')
  @Response<NoContentResult>(HttpSuccessStatusCode.NO_CONTENT)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async updateDriver(@Path() id: number, @Body() body: Omit<UpdateDriverDto, 'id'>) {
    const dto = new UpdateDriverDto({ ...body, id });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Disable a driver by it's id
   */
  @Delete('/{id}')
  @Response(HttpSuccessStatusCode.NO_CONTENT)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async disableDriver(@Path() id: number) {
    const dto = new DisableDriverDto({ id });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }
}
