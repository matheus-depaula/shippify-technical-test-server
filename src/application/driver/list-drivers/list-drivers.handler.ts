import { inject, injectable } from 'inversify';
import { Driver } from '../../../domain/entities/driver.entity';
import { EDriverRelations } from '../../../infrastructure/database/enums/driver-relations.enum';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { Result } from '../../contracts/results/result.handler';
import { SuccessResult } from '../../contracts/results/success-result';
import { DtoHandler } from '../../dto.handler';
import { ListDriversDto } from './list-drivers.dto';

@injectable()
export class ListDriversHandler implements DtoHandler<ListDriversDto> {
  constructor(@inject(DriverRepository) private driverRepository: DriverRepository) {}

  public async handle(dto: ListDriversDto): Promise<Result<Driver[]>> {
    const where = { ...dto.where };

    if (!where.first_name) delete where.first_name;
    if (!where.last_name) delete where.last_name;
    if (!where.email) delete where.email;
    if (!where.status) delete where.status;

    if (!where.company?.id) delete where.company?.id;
    if (!where.company?.city) delete where.company?.city;
    if (!where.company?.plan_type) delete where.company?.plan_type;
    if (!where.company?.status) delete where.company?.status;
    if (where.company && Object.keys(where.company).length <= 0) delete where.company;

    const relations: EDriverRelations[] = [];

    if (where.company) relations.push(EDriverRelations.COMPANY);

    const drivers = await this.driverRepository.list(where, dto.filter, relations);

    drivers.forEach(driver => delete driver.company);

    return new SuccessResult({ data: drivers });
  }
}
