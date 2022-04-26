export class CreateDriverDto {
  public readonly firstName!: string;
  public readonly lastName!: string;
  public readonly email!: string;
  public readonly phone!: string;
  public readonly avatarUrl?: string;
  public readonly companyId!: number;

  constructor(dto: CreateDriverDto) {
    Object.assign(this, dto);
  }
}
