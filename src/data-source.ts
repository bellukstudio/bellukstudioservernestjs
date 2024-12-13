import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { Experience } from './experience/entities/experience.entity';
import { Portfolio } from './portfolio/entities/portofolio.entity';
import { Skill } from './skill/entities/skill.entity';
import { Overview } from './overview/entities/overview.entity';
import { Contact } from './contact/entities/contact.entity';
import { Education } from './education/entities/education.entity';
import { Profile } from './myprofile/entities/profile.entity';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    migrations: ['migrations/**'],
    entities: [User, Experience, Portfolio, Skill, Overview, Profile, Education, Contact],
});
