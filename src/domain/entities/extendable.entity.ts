import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export interface IExtendableEntity {
  id?: number;
  creation_date: Date;
}

export class ExtendableEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  private readonly _id?: number;

  @CreateDateColumn({ name: 'creation_date' })
  private readonly _creation_date!: Date;

  constructor(data: IExtendableEntity) {
    this._id = data?.id;
    this._creation_date = data?.creation_date;
  }

  get id(): number | undefined {
    return this._id;
  }

  get creationDate(): Date {
    return this._creation_date;
  }
}
