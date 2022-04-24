import { inject, injectable } from 'inversify';
import { Company } from '../../../domain/entities/company.entity';
import { EVehicleRelations } from '../../../infrastructure/database/enums/vehicle-relations.enum';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { NotFoundResult } from '../../contracts/results/not-found-result';
import { Result } from '../../contracts/results/result.handler';
import { SuccessResult } from '../../contracts/results/success-result';
import { DtoHandler } from '../../dto.handler';
import { FindVehicleByIdDto } from './find-vehicle-by-id.dto';

@injectable()
export class FindVehicleByIdHandler implements DtoHandler<FindVehicleByIdDto> {
  constructor(@inject(VehicleRepository) private vehicleRepository: VehicleRepository) {}

  public async handle(dto: FindVehicleByIdDto): Promise<Result<Company>> {
    const relations: EVehicleRelations[] = [];

    if (dto.company) relations.push(EVehicleRelations.DRIVER, EVehicleRelations.COMPANY);
    else if (dto.driver) relations.push(EVehicleRelations.DRIVER);

    const vehicle = await this.vehicleRepository.findById(dto.id, relations, dto.activeOnly);

    if (!vehicle) return new NotFoundResult('Driver not found');

    return new SuccessResult({ data: vehicle });
  }
}
