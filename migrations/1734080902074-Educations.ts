import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Educations1734080902074 implements MigrationInterface {


    private readonly logger = new Logger(Educations1734080902074.name);
    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down');
    }
}
