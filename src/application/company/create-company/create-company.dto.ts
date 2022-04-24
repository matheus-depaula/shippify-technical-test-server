import { ECompanyPlanType } from '../../../domain/enums/company-plan-type.enum';

export class CreateCompanyDto {
  public readonly name!: string;
  public readonly city!: number;
  public readonly planType!: ECompanyPlanType;

  constructor(dto: CreateCompanyDto) {
    Object.assign(this, dto);
  }
}
