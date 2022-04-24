import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExtendableEntity } from './extendable.entity';
import { EVehicleType } from '../enums/vehicle-type.enum';
import { Driver } from './driver.entity';
import { EEntityStatus } from '../enums/entity-status.enum';

@Entity({ name: 'vehicles' })
export class Vehicle extends ExtendableEntity {
  @Column({ length: 100, unique: true })
  public plate!: string;

  @Column({ length: 100 })
  public model!: string;

  @Column('simple-enum', { enum: EVehicleType })
  public type!: EVehicleType;

  @Column({ length: 20 })
  public capacity!: string;

  @ManyToOne(_type => Driver, driver => driver.vehicles)
  @JoinColumn({ name: 'driver_id' })
  public driver?: Driver;

  constructor(data?: Vehicle) {
    super(data);
  }

  public update(plate?: string, model?: string, type?: EVehicleType, capacity?: string, driver?: Driver): Vehicle {
    if (plate) this.plate = plate;
    if (model) this.model = model;
    if (type) this.type = type;
    if (capacity) this.capacity = capacity;
    if (driver) this.driver = driver;

    return this;
  }

  public disable() {
    this.status = EEntityStatus.DISABLED;
  }
}
