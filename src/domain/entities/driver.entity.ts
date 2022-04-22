import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ExtendableEntity, IExtendableEntity } from './extendable.entity';
import { EEntityStatus } from '../enums/entity-status.enum';
import { Company } from './company.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Driver extends ExtendableEntity {
  @Column({ length: 100, name: 'first_name' })
  private _first_name!: string;

  @Column({ length: 100, name: 'last_name' })
  private _last_name!: string;

  @Column({ length: 100, name: 'email', unique: true })
  private _email!: string;

  @Column({ length: 20, name: 'phone' })
  private _phone!: string;

  @Column({ length: 200, name: 'avatar_url' })
  private _avatar_url!: string;

  @Column('simple-enum', { name: 'status', enum: EEntityStatus })
  private _status!: EEntityStatus;

  @ManyToOne(_type => Company, company => company.drivers)
  @JoinColumn({ name: 'company_id' })
  private _company!: Company;

  @OneToMany(_type => Vehicle, vehicle => vehicle.driver)
  private _vehicles!: Vehicle[];

  constructor(data: IExtendableEntity) {
    super(data);
  }

  public static create({ id, creationDate, ...props }: Driver): Driver {
    return new Driver({ id, creation_date: creationDate, ...props });
  }

  get firstName(): string {
    return this._first_name;
  }

  set firstName(_firstName: string) {
    this._first_name = _firstName;
  }

  get lastName(): string {
    return this._last_name;
  }

  set lastName(_lastName: string) {
    this._last_name = _lastName;
  }

  get email(): string {
    return this._email;
  }

  set email(_email: string) {
    this._email = _email;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(_phone: string) {
    this._phone = _phone;
  }

  get avatarUrl(): string {
    return this._avatar_url;
  }

  set avatarUrl(_avatarUrl: string) {
    this._avatar_url = _avatarUrl;
  }

  get status(): EEntityStatus {
    return this._status;
  }

  set status(_status: EEntityStatus) {
    this._status = _status;
  }

  get company(): Company {
    return this._company;
  }

  set company(_company: Company) {
    this._company = _company;
  }

  get vehicles(): Vehicle[] {
    return this._vehicles;
  }

  set vehicles(_vehicle: Vehicle[]) {
    this._vehicles = _vehicle;
  }

  public addVehicle(_vehicle: Vehicle) {
    this._vehicles.push(_vehicle);
  }

  public removeVehicle(id: number) {
    this._vehicles = this._vehicles.filter(vehicle => vehicle.id !== id);
  }
}
