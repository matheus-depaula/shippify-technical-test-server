import { inject, injectable } from 'inversify';
import { CompanyRepository } from '../../../infrastructure/database/repositories/company.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { CreatedResult } from '../../contracts/results/created-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { CreateCompanyDto } from './create-company.dto';

@injectable()
export class CreateCompanyHandler implements DtoHandler<CreateCompanyDto> {
  constructor(@inject(CompanyRepository) private companyRepository: CompanyRepository) {}

  public async handle(dto: CreateCompanyDto): Promise<Result> {
    const companyExists = await this.companyRepository.exists('name', dto.name);

    if (companyExists) return new BadRequestResult('Company already exists');

    await this.companyRepository.save({ ...dto, plan_type: dto.planType });

    return new CreatedResult();
  }
}
