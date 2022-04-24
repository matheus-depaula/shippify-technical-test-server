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
import { ListVehiclesDto } from '../../../application/vehicle/list-vehicles/list-vehicles.dto';
import { CreateVehicleDto } from '../../../application/vehicle/create-vehicle/create-vehicle.dto';
import { FindVehicleByIdDto } from '../../../application/vehicle/find-vehicle-by-id/find-vehicle-by-id.dto';
import { DisableVehicleDto } from '../../../application/vehicle/disable-vehicle/disable-vehicle.dto';
import { UpdateVehicleDto } from '../../../application/vehicle/update-vehicle/update-vehicle.dto';
import { EVehicleType } from '../../../domain/enums/vehicle-type.enum';

@injectable()
@Tags('Vehicle')
@Route('vehicle')
export class VehicleController extends ExtendableController {
  /**
   * @summary List vehicles
   */
  @Get()
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async listVehicles(
    @Query() plate?: string,
    @Query() model?: string,
    @Query() type?: EVehicleType,
    @Query() capacity?: string,
    @Query() status: EEntityStatus = EEntityStatus.ACTIVE,
    @Query() driverId?: number,
    @Query() driverFirstName?: string,
    @Query() driverLastName?: string,
    @Query() driverEmail?: string,
    @Query() driverStatus: EEntityStatus = EEntityStatus.ACTIVE,
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
    const dto = new ListVehiclesDto({
      where: {
        plate,
        model,
        type,
        capacity,
        status: activeOnly ? EEntityStatus.ACTIVE : status,
        driver: {
          id: driverId,
          first_name: driverFirstName,
          last_name: driverLastName,
          email: driverEmail,
          status: activeOnly ? EEntityStatus.ACTIVE : driverStatus,
          company: {
            id: companyId,
            city: companyCity,
            status: activeOnly ? EEntityStatus.ACTIVE : companyStatus,
            plan_type: companyPlanType,
          },
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
   * @summary Find vehicle by id
   */
  @Get('/{id}')
  @Response<IErrorMessage>(HttpClientErrorStatusCode.NOT_FOUND)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async getVehicleById(
    @Path() id: number,
    @Query() driver: boolean = false,
    @Query() company: boolean = false,
    @Query() activeOnly: boolean = true
  ) {
    const dto = new FindVehicleByIdDto({ id, driver, company, activeOnly });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Creates a new vehicle
   */
  @Post()
  @Response<CreatedResult>(HttpSuccessStatusCode.CREATED)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async createVehicle(@Body() body: CreateVehicleDto) {
    const dto = new CreateVehicleDto(body);
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Updates a vehicle by it's id
   */
  @Put('/{id}')
  @Response<NoContentResult>(HttpSuccessStatusCode.NO_CONTENT)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async updateVehicle(@Path() id: number, @Body() body: Omit<UpdateVehicleDto, 'id'>) {
    const dto = new UpdateVehicleDto({ ...body, id });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }

  /**
   * @summary Disable a vehicle by it's id
   */
  @Delete('/{id}')
  @Response(HttpSuccessStatusCode.NO_CONTENT)
  @Response<IErrorMessage>(HttpClientErrorStatusCode.BAD_REQUEST)
  @Response<IErrorMessage>(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR)
  public async disableVehicle(@Path() id: number) {
    const dto = new DisableVehicleDto({ id });
    const mediatorResult = await this.mediator.send(dto);

    const { data, statusCode } = resultHandler(mediatorResult);

    this.setStatus(statusCode);

    return data;
  }
}
