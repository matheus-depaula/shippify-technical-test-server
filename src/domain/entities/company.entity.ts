import { Column, Entity, OneToMany } from 'typeorm';
import { ExtendableEntity, IExtendableEntity } from './extendable.entity';
import { ECompanyPlanType } from '../enums/company-plan-type.enum';
import { EEntityStatus } from '../enums/entity-status.enum';
import { Driver } from './driver.entity';

@Entity()
export class Company extends ExtendableEntity {
  @Column({ length: 100, name: 'name', unique: true })
  private _name!: string;

  @Column({ name: 'city' })
  private _city!: number;

  @Column('simple-enum', { name: 'status', enum: EEntityStatus })
  private _status!: EEntityStatus;

  @Column('simple-enum', { name: 'plan_type', enum: ECompanyPlanType })
  private _plan_type!: ECompanyPlanType;

  @OneToMany(_type => Driver, driver => driver)
  private _drivers!: Driver[];

  constructor(data: IExtendableEntity) {
    super(data);
  }

  public static create({ id, creationDate, ...props }: Company): Company {
    return new Company({ id, creation_date: creationDate, ...props });
  }

  get name(): string {
    return this._name;
  }

  set name(_name: string) {
    this._name = _name;
  }

  get city(): number {
    return this._city;
  }

  set city(_city: number) {
    this._city = _city;
  }

  get status(): EEntityStatus {
    return this._status;
  }

  set status(_status: EEntityStatus) {
    this._status = _status;
  }

  get planType(): ECompanyPlanType {
    return this._plan_type;
  }

  set planType(_planType: ECompanyPlanType) {
    this._plan_type = _planType;
  }

  get drivers(): Driver[] {
    return this._drivers;
  }

  set drivers(_drivers: Driver[]) {
    this._drivers = _drivers;
  }

  public addDriver(_driver: Driver) {
    this.drivers.push(_driver);
  }

  public removeDriver(id: number) {
    this.drivers = this.drivers.filter(driver => driver.id !== id);
  }
}
