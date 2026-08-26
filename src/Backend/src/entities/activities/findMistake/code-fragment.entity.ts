import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

@Entity()
export class CodeFragment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: Difficulty})
    difficulty: Difficulty;

    @Column({ type: 'text', array: true, default: [] })
    codeLines: string[];

    @Column()
    wrongLineIndex: number;
}