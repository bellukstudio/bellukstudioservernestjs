import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('educations')
export class Education {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'education_level', type: 'varchar', length: 100, nullable: true })
    educationLevel: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    institution: string;

    @Column({ name: 'field_of_study', type: 'varchar', length: 150, nullable: true})
    fieldOfStudy?: string;

    @Column({ name: 'start_month', type: 'date' , nullable: true})
    startMonth: string;

    @Column({ name: 'finish_month', type: 'date' , nullable: true})
    finishMonth: string;

}
