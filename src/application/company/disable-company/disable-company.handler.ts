import { inject, injectable } from 'inversify';
import { CompanyRepository } from '../../../infrastructure/database/repositories/company.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { NoContentResult } from '../../contracts/results/no-content-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { DisableCompanyDto } from './disable-company.dto';

@injectable()
export class DisableCompanyHandler implements DtoHandler<DisableCompanyDto> {
  constructor(@inject(CompanyRepository) private companyRepository: CompanyRepository) {}

  public async handle(dto: DisableCompanyDto): Promise<Result> {
    const company = await this.companyRepository.findById(dto.id);

    if (!company) return new BadRequestResult('Company not exists');

    company.disable();

    await this.companyRepository.save(company);

    return new NoContentResult();
  }
}
