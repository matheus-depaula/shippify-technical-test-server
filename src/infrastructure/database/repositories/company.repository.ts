import { injectable } from 'inversify';
import { EntityRepository, getRepository } from 'typeorm';
import { Company } from '../../../domain/entities/company.entity';
import { ICompanyRepository } from '../../../domain/repositories/company.repository.interface';
import {
  databaseRepositoryExistsOptions,
  databaseRepositoryFindByIdOptions,
  databaseRepositoryListOptions,
} from '../database-repository-list-options';
import { ECompanyRelations } from '../enums/company-relations.enum';
import { ICompanyWhere } from '../interfaces/company-where.interface';
import { IDatabaseFilter } from '../interfaces/database-filter.interface';

@injectable()
@EntityRepository(CompanyRepository)
export class CompanyRepository implements ICompanyRepository {
  private readonly repository = getRepository(Company);

  public async save(data: Partial<Company>): Promise<void> {
    console.log('DATABASE ### - Save Company');

    await this.repository.save(data);
  }

  public async list(whereArg?: ICompanyWhere, filterArg?: IDatabaseFilter, relationsArg?: ECompanyRelations[]): Promise<Company[]> {
    console.log('DATABASE ### - List Companies');

    const options = databaseRepositoryListOptions(whereArg, filterArg, relationsArg);

    return await this.repository.find(options);
  }

  public async findById(id: number, relationsArg?: ECompanyRelations[], activeOnly: boolean = true): Promise<Company | undefined> {
    console.log('DATABASE ### - Find Company By Id');

    const options = databaseRepositoryFindByIdOptions(id, relationsArg, activeOnly);

    return await this.repository.findOne(options);
  }

  public async exists(key: string, value: string): Promise<boolean> {
    console.log('DATABASE ### - Company Exists');

    const options = databaseRepositoryExistsOptions(key, value);

    return !!(await this.repository.findOne(options));
  }
}
