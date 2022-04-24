export class DisableCompanyDto {
  public readonly id!: number;

  constructor(dto: DisableCompanyDto) {
    Object.assign(this, dto);
  }
}
