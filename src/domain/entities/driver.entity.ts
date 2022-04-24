import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ExtendableEntity } from './extendable.entity';
import { EEntityStatus } from '../enums/entity-status.enum';
import { Company } from './company.entity';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'drivers' })
export class Driver extends ExtendableEntity {
  @Column({ length: 100 })
  public first_name!: string;

  @Column({ length: 100 })
  public last_name!: string;

  @Column({ length: 100, unique: true })
  public email!: string;

  @Column({ length: 20 })
  public phone!: string;

  @Column({ length: 200 })
  public avatar_url!: string;

  @ManyToOne(_type => Company, company => company.drivers)
  @JoinColumn({ name: 'company_id' })
  public company?: Company;

  @OneToMany(_type => Vehicle, vehicle => vehicle.driver)
  public vehicles!: Vehicle[];

  constructor(data?: Driver) {
    super(data);
  }

  public update(first_name?: string, last_name?: string, email?: string, phone?: string, avatar_url?: string): Driver {
    if (first_name) this.first_name = first_name;
    if (last_name) this.last_name = last_name;
    if (email) this.email = email;
    if (phone) this.phone = phone;
    if (avatar_url) this.avatar_url = avatar_url;

    return this;
  }

  public disable() {
    this.status = EEntityStatus.DISABLED;
  }

  public addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
  }

  public removeVehicle(id: number) {
    this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
  }
}
