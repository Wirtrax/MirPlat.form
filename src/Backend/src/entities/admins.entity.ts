import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum AdminRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    password_hash: string;

    @Column({ type: 'enum', enum: AdminRole, default: AdminRole.ADMIN })
    role: AdminRole;
}