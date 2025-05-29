import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';  // Assuming User is an entity in the correct path

@Entity({ name: 'portfolios' })  // Define the name of the table as 'portfolio'
export class Portfolio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()  // Maps to the title column
    title: string;

    @Column()  // Maps to the description column
    description: string;

    @Column({ nullable: true })  // Maps to the URL portfolio column
    urlPortfolio?: string;

    @Column({ nullable: true })  // Maps to the URL portfolio column
    urlGithub: string;

    @Column({ nullable: true })  // Maps to the optional thumbnail column, nullable if not provided
    thumbnail?: string;

    @ManyToOne(() => User, user => user.portfolios)  // Relation to User entity
    @JoinColumn({ name: 'userId' })  // This specifies the column name for the foreign key
    user: User;

    @CreateDateColumn()  // Automatically set the creation timestamp
    createdAt: Date;

    @UpdateDateColumn()  // Automatically set the update timestamp
    updatedAt: Date;
}
