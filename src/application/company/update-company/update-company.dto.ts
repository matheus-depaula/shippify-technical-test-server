import { ECompanyPlanType } from '../../../domain/enums/company-plan-type.enum';

export class UpdateCompanyDto {
  public id!: number;
  public name?: string;
  public city?: number;
  public plan_type?: ECompanyPlanType;

  constructor(dto: UpdateCompanyDto) {
    Object.assign(this, dto);
  }
}
