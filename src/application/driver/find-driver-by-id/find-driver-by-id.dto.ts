export class FindDriverByIdDto {
  public readonly id!: number;
  public readonly company!: boolean;
  public readonly activeOnly!: boolean;

  constructor(dto: FindDriverByIdDto) {
    Object.assign(this, dto);
  }
}
