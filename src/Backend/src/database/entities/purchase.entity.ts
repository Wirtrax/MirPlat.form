import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Item } from './item.entity';

export enum PurchaseStatus {
  WAITING = "waiting",
  RECEIVED = "received",
  CANCELED = "canceled"  
}

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @ManyToOne(() => Item, (item) => item.purchases)
  item: Item;

  @Column({type: "enum", enum: PurchaseStatus})
  status: PurchaseStatus;

  @Column()
  code: string;
}
