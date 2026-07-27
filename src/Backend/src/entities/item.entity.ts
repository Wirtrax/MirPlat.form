import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  is_active: boolean;

  @OneToMany(() => Purchase, (purchase) => purchase.item)
  purchases: Purchase[];
}
