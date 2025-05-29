import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1734080876166 implements MigrationInterface {

    private readonly logger = new Logger(Users1734080876166.name);
    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down');
    }
}
