import { EVehicleType } from '../../../domain/enums/vehicle-type.enum';

export class CreateVehicleDto {
  public readonly plate!: string;
  public readonly model!: string;
  public readonly type!: EVehicleType;
  public readonly capacity?: string;
  public readonly driverId!: number;

  constructor(dto: CreateVehicleDto) {
    Object.assign(this, dto);
  }
}
