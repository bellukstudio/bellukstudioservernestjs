import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("overviews")
export class Overview {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text',nullable: true })
    overview: string;

    @Column({ type:'text', nullable: true})
    urlGithub: string;

    @Column({ type:'text', nullable: true})
    urlLinkedIn: string;

    @Column({ type:'text', nullable: true})
    githubName: string;

    @Column({ type:'text', nullable: true})
    linkedInName: string;

    @Column({ nullable: true })  // Maps to the optional thumbnail column, nullable if not provided
    photo?: string;
}
