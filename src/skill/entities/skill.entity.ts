import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    skillName: string;

    @Column({ nullable: true })
    level: string;

}