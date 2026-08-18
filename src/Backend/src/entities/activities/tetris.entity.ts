import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Tetris {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'tetris' })
    name: string;

    @Column()
    reward: number;

    @Column()
    photo_example_link: string;
}