export class DisableVehicleDto {
  public readonly id!: number;

  constructor(dto: DisableVehicleDto) {
    Object.assign(this, dto);
  }
}
