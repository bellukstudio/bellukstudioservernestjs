import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow('DB_HOST'),
                port: parseInt(configService.getOrThrow('DB_PORT')),
                database: configService.getOrThrow('DB_NAME'),
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'false',
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
