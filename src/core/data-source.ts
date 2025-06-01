import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/auth/entities/user.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Profile } from 'src/myprofile/entities/profile.entity';
import { Overview } from 'src/overview/entities/overview.entity';
import { Portfolio } from 'src/portfolio/entities/portofolio.entity';
import { Skill } from 'src/skill/entities/skill.entity';

import { DataSource } from 'typeorm';
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: configService.getOrThrow('DB_PORT'),
    database: configService.getOrThrow('DB_NAME'),
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    migrations: ['migrations/**'],
    entities: [User, Experience, Portfolio, Skill, Overview, Profile, Education, Contact],
});
