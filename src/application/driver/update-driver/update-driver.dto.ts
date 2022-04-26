export class UpdateDriverDto {
  public readonly id!: number;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public phone?: string;
  public avatarUrl?: string;

  constructor(dto: UpdateDriverDto) {
    Object.assign(this, dto);
  }
}
