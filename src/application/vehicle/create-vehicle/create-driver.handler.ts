import { inject, injectable } from 'inversify';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { CreatedResult } from '../../contracts/results/created-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { CreateVehicleDto } from './create-vehicle.dto';

@injectable()
export class CreateVehicleHandler implements DtoHandler<CreateVehicleDto> {
  constructor(
    @inject(DriverRepository) private driverRepository: DriverRepository,
    @inject(VehicleRepository) private vehicleRepository: VehicleRepository
  ) {}

  public async handle(dto: CreateVehicleDto): Promise<Result> {
    const vehicleExists = await this.vehicleRepository.exists('plate', dto.plate);

    if (vehicleExists) return new BadRequestResult('Vehicle already exists');

    const driver = await this.driverRepository.findById(dto.driverId);

    if (!driver) return new BadRequestResult('Driver not exists');

    await this.vehicleRepository.save({ ...dto, driver });

    return new CreatedResult();
  }
}
