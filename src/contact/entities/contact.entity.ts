import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    subject: string;

    @Column('text')
    message: string;
}
