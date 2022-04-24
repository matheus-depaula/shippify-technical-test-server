import { EVehicleType } from '../../../domain/enums/vehicle-type.enum';

export class UpdateVehicleDto {
  public readonly id!: number;
  public plate?: string;
  public model?: string;
  public type?: EVehicleType;
  public capacity?: string;
  public driverId?: number;

  constructor(dto: UpdateVehicleDto) {
    Object.assign(this, dto);
  }
}
