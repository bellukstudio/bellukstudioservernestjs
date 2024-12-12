import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Experience } from 'src/experience/entities/experience.entity';
import { Portfolio } from 'src/portfolio/entities/portofolio.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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
