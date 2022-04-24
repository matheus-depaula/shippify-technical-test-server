import { inject, injectable } from 'inversify';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyRepository } from '../../../infrastructure/database/repositories/company.repository';
import { NotFoundResult } from '../../contracts/results/not-found-result';
import { Result } from '../../contracts/results/result.handler';
import { SuccessResult } from '../../contracts/results/success-result';
import { DtoHandler } from '../../dto.handler';
import { FindCompanyByIdDto } from './find-company-by-id.dto';

@injectable()
export class FindCompanyByIdHandler implements DtoHandler<FindCompanyByIdDto> {
  constructor(@inject(CompanyRepository) private companyRepository: CompanyRepository) {}

  public async handle(dto: FindCompanyByIdDto): Promise<Result<Company>> {
    const company = await this.companyRepository.findById(dto.id, [], dto.activeOnly);

    if (!company) return new NotFoundResult('Company not found');

    return new SuccessResult({ data: company });
  }
}
