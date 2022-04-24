import { inject, injectable } from 'inversify';
import { CompanyRepository } from '../../../infrastructure/database/repositories/company.repository';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { CreatedResult } from '../../contracts/results/created-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { CreateDriverDto } from './create-driver.dto';

@injectable()
export class CreateDriverHandler implements DtoHandler<CreateDriverDto> {
  constructor(
    @inject(CompanyRepository) private companyRepository: CompanyRepository,
    @inject(DriverRepository) private driverRepository: DriverRepository
  ) {}

  public async handle(dto: CreateDriverDto): Promise<Result> {
    const driverExists = await this.driverRepository.exists('email', dto.email);

    if (driverExists) return new BadRequestResult('Driver already exists');

    const company = await this.companyRepository.findById(dto.companyId);

    if (!company) return new BadRequestResult('Company not exists');

    await this.driverRepository.save({ ...dto, company });

    return new CreatedResult();
  }
}
