import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

//* Define the Experience entity class
@Entity('experiences') // Nama tabel database
export class Experience {
    //* Primary key: Unique identifier for each experience
    @PrimaryGeneratedColumn('uuid')
    id: string;
    //* Job title of the experience
    @Column({nullable: true})
    jobTitle: string;

    //* Company name where the experience was gained
    @Column({nullable: true})
    company: string;

    //* Starting month of the experience
    @Column({nullable: true})
    startMonth: string;

    //* Finishing month of the experience
    @Column({ nullable: true }) // Nullable untuk pengalaman yang masih berlangsung
    finishMonth: string;

    //* Overview or description of the experience
    @Column({ type: 'text' , nullable: true})
    overview: string;

    //* Reference to the user (Many experiences belong to one user)
    @ManyToOne(() => User, (user) => user.experiences, { onDelete: 'CASCADE' }) // Relasi ke entitas User
    user: User;

    //* Timestamp for when the experience was created
    @CreateDateColumn()
    createdAt: Date;

    //* Timestamp for when the experience was last updated
    @UpdateDateColumn()
    updatedAt: Date;
}
