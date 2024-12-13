import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("overviews")
export class Overview {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    overview: string;
}
