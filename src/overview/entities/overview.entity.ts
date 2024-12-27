import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("overviews")
export class Overview {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    overview: string;

    @Column({ type:'text'})
    urlGithub: string;

    @Column({ type:'text'})
    urlLinkedIn: string;

    @Column({ type:'text'})
    githubName: string;

    @Column({ type:'text'})
    linkedInName: string;

    @Column({ nullable: true })  // Maps to the optional thumbnail column, nullable if not provided
    photo?: string;
}
