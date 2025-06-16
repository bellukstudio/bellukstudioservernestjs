import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fullname: string;

    @Column({ type: 'varchar', unique: true, length: 255 , nullable: true})
    email: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    contact: string;

    @Column({ type: 'varchar' , nullable: true})
    liveIn: string;

    @Column({ type: 'varchar' , nullable: true})
    available: string;

    @Column({ type: 'varchar', nullable: true })
    degree: string;

    @Column({ type: 'text', nullable: true })
    overview?: string;

    @CreateDateColumn()
    birthOfDay: Date;

    @Column({ nullable: true })  // Maps to the optional thumbnail column, nullable if not provided
    photo?: string;

    @Column({ nullable: true })  // Maps to the optional thumbnail column, nullable if not provided
    background?: string;
}