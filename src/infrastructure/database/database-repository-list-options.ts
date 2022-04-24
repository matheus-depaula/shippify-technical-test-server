import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EEntityStatus } from '../../domain/enums/entity-status.enum';
import { IDatabaseFilter } from './interfaces/database-filter.interface';

export const databaseRepositoryListOptions = (whereArg?: object, filterArg?: IDatabaseFilter, relationsArg?: string[]): FindManyOptions => {
  return {
    where: whereArg,
    order: { [filterArg?.orderBy ?? 'creation_date']: filterArg?.orderType ?? 'DESC' },
    take: filterArg?.take ?? 10,
    skip: filterArg?.skip ?? 0,
    relations: relationsArg,
  };
};

export const databaseRepositoryFindByIdOptions = (id: number, relationsArg?: string[], activeOnly?: boolean): FindOneOptions => {
  return {
    where: { id, status: activeOnly ? EEntityStatus.ACTIVE : EEntityStatus.DISABLED },
    relations: relationsArg,
  };
};

export const databaseRepositoryExistsOptions = (key: string, value: string): FindOneOptions => {
  return {
    where: { [key]: value },
  };
};
