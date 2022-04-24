export class FindVehicleByIdDto {
  public readonly id!: number;
  public readonly driver!: boolean;
  public readonly company!: boolean;
  public readonly activeOnly!: boolean;

  constructor(dto: FindVehicleByIdDto) {
    Object.assign(this, dto);
  }
}
