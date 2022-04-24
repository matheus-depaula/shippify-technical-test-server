export class FindCompanyByIdDto {
  public readonly id!: number;
  public readonly activeOnly!: boolean;

  constructor(dto: FindCompanyByIdDto) {
    Object.assign(this, dto);
  }
}
