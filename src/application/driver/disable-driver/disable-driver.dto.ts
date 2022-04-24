export class DisableDriverDto {
  public readonly id!: number;

  constructor(dto: DisableDriverDto) {
    Object.assign(this, dto);
  }
}
