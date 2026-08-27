import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    icon: string;

    @Column()
    group_id: string;
}