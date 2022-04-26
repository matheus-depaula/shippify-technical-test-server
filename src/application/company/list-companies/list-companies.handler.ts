import { inject, injectable } from 'inversify';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyRepository } from '../../../infrastructure/database/repositories/company.repository';
import { Result } from '../../contracts/results/result.handler';
import { SuccessResult } from '../../contracts/results/success-result';
import { DtoHandler } from '../../dto.handler';
import { ListCompaniesDto } from './list-companies.dto';

@injectable()
export class ListCompaniesHandler implements DtoHandler<ListCompaniesDto> {
  constructor(@inject(CompanyRepository) private companyRepository: CompanyRepository) {}

  public async handle(dto: ListCompaniesDto): Promise<Result<Company[]>> {
    const where = { ...dto.where };

    if (!where.name) delete where.name;
    if (!where.city) delete where.city;
    if (!where.plan_type) delete where.plan_type;
    if (!where.status) delete where.status;

    const companies = await this.companyRepository.list(where, dto.filter);

    return new SuccessResult({ data: companies });
  }
}
