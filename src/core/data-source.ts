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
    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    migrations: ['migrations/**'],
    entities: [User, Experience, Portfolio, Skill, Overview, Profile, Education, Contact],
});
