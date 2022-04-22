import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExtendableEntity, IExtendableEntity } from './extendable.entity';
import { EVehicleType } from '../enums/vehicle-type.enum';
import { Driver } from './driver.entity';

@Entity()
export class Vehicle extends ExtendableEntity {
  @Column({ length: 100, name: 'plate', unique: true })
  private _plate!: string;

  @Column({ length: 100, name: 'model' })
  private _model!: string;

  @Column('simple-enum', { name: 'type', enum: EVehicleType })
  private _type!: EVehicleType;

  @Column({ length: 20, name: 'capacity' })
  private _capacity!: string;

  @ManyToOne(_type => Driver, driver => driver.vehicles)
  @JoinColumn({ name: 'driver_id' })
  private _driver!: Driver;

  constructor(data: IExtendableEntity) {
    super(data);
  }

  public static create({ id, creationDate, ...props }: Vehicle): Vehicle {
    return new Vehicle({ id, creation_date: creationDate, ...props });
  }

  get plate(): string {
    return this._plate;
  }

  set plate(_plate: string) {
    this._plate = _plate;
  }

  get model(): string {
    return this._model;
  }

  set model(_model: string) {
    this._model = _model;
  }

  get type(): EVehicleType {
    return this._type;
  }

  set type(_type: EVehicleType) {
    this._type = _type;
  }

  get capacity(): string {
    return this._capacity;
  }

  set capacity(_capacity: string) {
    this._capacity = _capacity;
  }

  get driver(): Driver {
    return this._driver;
  }

  set driver(_driver: Driver) {
    this._driver = _driver;
  }
}
