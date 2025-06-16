import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    subject: string;

    @Column({type: 'text',nullable: true})
    message: string;
}
