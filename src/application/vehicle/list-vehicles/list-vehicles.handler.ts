import { inject, injectable } from 'inversify';
import { Driver } from '../../../domain/entities/driver.entity';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import { EVehicleRelations } from '../../../infrastructure/database/enums/vehicle-relations.enum';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { Result } from '../../contracts/results/result.handler';
import { SuccessResult } from '../../contracts/results/success-result';
import { DtoHandler } from '../../dto.handler';
import { ListVehiclesDto } from './list-vehicles.dto';

@injectable()
export class ListVehiclesHandler implements DtoHandler<ListVehiclesDto> {
  constructor(@inject(VehicleRepository) private vehicleRepository: VehicleRepository) {}

  public async handle(dto: ListVehiclesDto): Promise<Result<Driver[]>> {
    const where = { ...dto.where };

    if (!where.plate) delete where.plate;
    if (!where.model) delete where.model;
    if (!where.type) delete where.type;
    if (!where.capacity) delete where.capacity;
    if (!where.plate) delete where.plate;

    if (!where.driver?.id) delete where.driver?.id;
    if (!where.driver?.first_name) delete where.driver?.first_name;
    if (!where.driver?.last_name) delete where.driver?.last_name;
    if (!where.driver?.email) delete where.driver?.email;
    if (!where.driver?.status) delete where.driver?.status;
    if (where.driver && Object.keys(where.driver).length <= 0) delete where.driver;
    else {
      if (!where.driver?.company?.id) delete where.driver?.company?.id;
      if (!where.driver?.company?.city) delete where.driver?.company?.city;
      if (!where.driver?.company?.plan_type) delete where.driver?.company?.plan_type;
      if (!where.driver?.company?.status) delete where.driver?.company?.status;
      if (where.driver?.company && Object.keys(where.driver?.company).length <= 0) delete where.driver?.company;
    }

    const relations: EVehicleRelations[] = [];

    if (where?.driver?.company) relations.push(EVehicleRelations.DRIVER, EVehicleRelations.COMPANY);
    else if (where?.driver) relations.push(EVehicleRelations.DRIVER);

    const vehicles = await this.vehicleRepository.list(where, dto.filter, relations);

    vehicles.forEach(vehicle => delete vehicle?.driver);

    return new SuccessResult({ data: vehicles });
  }
}
