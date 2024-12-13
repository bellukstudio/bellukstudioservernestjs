import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    skillName: string;

    @Column()
    level: string;

}