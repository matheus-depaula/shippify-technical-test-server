import { Column, Entity, OneToMany } from 'typeorm';
import { ExtendableEntity } from './extendable.entity';
import { ECompanyPlanType } from '../enums/company-plan-type.enum';
import { EEntityStatus } from '../enums/entity-status.enum';
import { Driver } from './driver.entity';
import { injectable } from 'inversify';

@Entity({ name: 'companies' })
@injectable()
export class Company extends ExtendableEntity {
  @Column({ length: 100, unique: true })
  public name!: string;

  @Column({ name: 'city' })
  public city!: number;

  @Column('simple-enum', { enum: ECompanyPlanType })
  public plan_type!: ECompanyPlanType;

  @OneToMany(_type => Driver, driver => driver)
  public drivers?: Driver[];

  constructor(data?: Company) {
    super(data);
  }

  public update(name?: string, city?: number, plan_type?: ECompanyPlanType): Company {
    if (name) this.name = name;
    if (city) this.city = city;
    if (plan_type) this.plan_type = plan_type;

    return this;
  }

  public disable() {
    this.status = EEntityStatus.DISABLED;
  }

  public addDriver(driver: Driver) {
    this.drivers?.push(driver);
  }

  public removeDriver(id: number) {
    this.drivers = this.drivers?.filter(driver => driver.id !== id);
  }
}
