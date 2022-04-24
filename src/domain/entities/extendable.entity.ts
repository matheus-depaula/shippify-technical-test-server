import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EEntityStatus } from '../enums/entity-status.enum';

export class ExtendableEntity {
  @PrimaryGeneratedColumn('increment')
  public id?: number;

  @Column('simple-enum', { enum: EEntityStatus, default: EEntityStatus.ACTIVE })
  public status!: EEntityStatus;

  @CreateDateColumn()
  public creation_date?: Date;

  constructor(data?: ExtendableEntity) {
    this.id = data?.id;
    this.status = data?.status ?? EEntityStatus.ACTIVE;
    this.creation_date = data?.creation_date;
  }
}
