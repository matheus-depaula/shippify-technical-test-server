export class UpdateDriverDto {
  public readonly id!: number;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public phone?: string;
  public avatar?: string;

  constructor(dto: UpdateDriverDto) {
    Object.assign(this, dto);
  }
}
