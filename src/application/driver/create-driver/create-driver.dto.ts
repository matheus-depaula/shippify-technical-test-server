export class CreateDriverDto {
  public readonly first_name!: string;
  public readonly last_name!: string;
  public readonly email!: string;
  public readonly phone?: string;
  public readonly avatar_url?: string;
  public readonly companyId!: number;

  constructor(dto: CreateDriverDto) {
    Object.assign(this, dto);
  }
}
