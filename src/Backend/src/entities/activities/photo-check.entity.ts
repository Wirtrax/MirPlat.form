import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhotoCheck {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'photoCheck' })
    name: string;

    @Column()
    reward: number;
}