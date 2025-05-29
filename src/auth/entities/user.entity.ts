import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Experience } from './../../experience/entities/experience.entity';
import { Portfolio } from './../../portfolio/entities/portofolio.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // 
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: Role;


    @OneToMany(() => Experience, (experience) => experience.user)
    experiences: Experience[];

    @OneToMany(() => Portfolio, (portofolio) => portofolio.user)
    portfolios: Portfolio[];
}
