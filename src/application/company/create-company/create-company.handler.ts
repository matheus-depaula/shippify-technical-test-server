import { injectable } from 'inversify';
import { DtoHandler } from '../../dto.handler';
import { CreateCompanyDto } from './create-company.dto';

@injectable()
export class CreateCompanyHandler implements DtoHandler<CreateCompanyDto> {
  public async handle(dto: CreateCompanyDto): Promise<undefined> {
    console.log(dto);

    return undefined;
  }
}
