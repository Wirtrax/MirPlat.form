import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CardGame4x4 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'card_game_4x4' })
    name: string;

    @Column()
    reward_per_group: number;

    @Column()
    max_reward: number;
}