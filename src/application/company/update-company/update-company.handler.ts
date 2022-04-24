import { inject, injectable } from 'inversify';
import { dtoHasSufficientProperties } from '../../../helpers/update-dto-properties';
import { CompanyRepository } from '../../../infrastructure/database/repositories/company.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { NoContentResult } from '../../contracts/results/no-content-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { UpdateCompanyDto } from './update-company.dto';

@injectable()
export class UpdateCompanyHandler implements DtoHandler<UpdateCompanyDto> {
  constructor(@inject(CompanyRepository) private companyRepository: CompanyRepository) {}

  public async handle(dto: UpdateCompanyDto): Promise<Result> {
    if (!dtoHasSufficientProperties(dto)) {
      return new BadRequestResult('Insufficient properties');
    }

    const company = await this.companyRepository.findById(dto.id);

    if (!company) return new BadRequestResult('Company not exists');

    if (dto.name) {
      const nameRegistered = await this.companyRepository.exists('name', dto.name);

      if (nameRegistered) return new BadRequestResult('Name already registered');
    }

    company.update(dto.name, dto.city, dto.plan_type);

    await this.companyRepository.save({ ...company, ...dto });

    return new NoContentResult();
  }
}
