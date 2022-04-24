import { inject, injectable } from 'inversify';
import { Driver } from '../../../domain/entities/driver.entity';
import { dtoHasSufficientProperties } from '../../../helpers/update-dto-properties';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { NoContentResult } from '../../contracts/results/no-content-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { UpdateVehicleDto } from './update-vehicle.dto';

@injectable()
export class UpdateVehicleHandler implements DtoHandler<UpdateVehicleDto> {
  constructor(
    @inject(VehicleRepository) private vehicleRepository: VehicleRepository,
    @inject(DriverRepository) private driverRepository: DriverRepository
  ) {}

  public async handle(dto: UpdateVehicleDto): Promise<Result> {
    if (!dtoHasSufficientProperties(dto)) {
      return new BadRequestResult('Insufficient properties');
    }

    const vehicle = await this.vehicleRepository.findById(dto.id);

    if (!vehicle) return new BadRequestResult('Vehicle not exists');

    if (dto.plate) {
      const plateRegistered = await this.vehicleRepository.exists('plate', dto.plate);

      if (plateRegistered) return new BadRequestResult('Plate already registered');
    }

    let driver: Driver | undefined;

    if (dto.driverId) {
      driver = await this.driverRepository.findById(dto.driverId);

      if (!driver) return new BadRequestResult('Driver not exists');
    }

    vehicle.update(dto.plate, dto.model, dto.type, dto.capacity, driver);

    await this.vehicleRepository.save({ ...vehicle, ...dto });

    return new NoContentResult();
  }
}
