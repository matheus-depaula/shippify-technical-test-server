import { inject, injectable } from 'inversify';
import { Company } from '../../../domain/entities/company.entity';
import { EDriverRelations } from '../../../infrastructure/database/enums/driver-relations.enum';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { NotFoundResult } from '../../contracts/results/not-found-result';
import { Result } from '../../contracts/results/result.handler';
import { SuccessResult } from '../../contracts/results/success-result';
import { DtoHandler } from '../../dto.handler';
import { FindDriverByIdDto } from './find-driver-by-id.dto';

@injectable()
export class FindDriverByIdHandler implements DtoHandler<FindDriverByIdDto> {
  constructor(@inject(DriverRepository) private driverRepository: DriverRepository) {}

  public async handle(dto: FindDriverByIdDto): Promise<Result<Company>> {
    const driver = await this.driverRepository.findById(dto.id, dto.company ? [EDriverRelations.COMPANY] : [], dto.activeOnly);

    if (!driver) return new NotFoundResult('Driver not found');

    return new SuccessResult({ data: driver });
  }
}
