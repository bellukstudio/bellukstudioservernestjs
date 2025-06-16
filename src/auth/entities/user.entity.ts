import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Experience } from './../../experience/entities/experience.entity';
import { Portfolio } from './../../portfolio/entities/portofolio.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true}) // 
    name: string;

    @Column({ unique: true,nullable: true })
    email: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    role: Role;


    @OneToMany(() => Experience, (experience) => experience.user)
    experiences: Experience[];

    @OneToMany(() => Portfolio, (portofolio) => portofolio.user)
    portfolios: Portfolio[];
}
