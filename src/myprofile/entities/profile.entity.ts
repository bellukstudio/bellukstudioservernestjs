import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    fullname: string;

    @Column({ type: 'varchar', unique: true, length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 15 })
    contact: string;

    @Column({ type: 'text', nullable: true })
    overview?: string;

    @Column({ nullable: true })  // Maps to the optional thumbnail column, nullable if not provided
    photo?: string;

    @Column({ nullable: true })  // Maps to the optional thumbnail column, nullable if not provided
    background?: string;
}