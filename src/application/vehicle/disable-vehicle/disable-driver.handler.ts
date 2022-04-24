import { inject, injectable } from 'inversify';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { NoContentResult } from '../../contracts/results/no-content-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { DisableVehicleDto } from './disable-vehicle.dto';

@injectable()
export class DisableVehicleHandler implements DtoHandler<DisableVehicleDto> {
  constructor(@inject(VehicleRepository) private vehicleRepository: VehicleRepository) {}

  public async handle(dto: DisableVehicleDto): Promise<Result> {
    const vehicle = await this.vehicleRepository.findById(dto.id, [], true);

    if (!vehicle) return new BadRequestResult('Vehicle not exists');

    vehicle.disable();

    await this.vehicleRepository.save(vehicle);

    return new NoContentResult();
  }
}
