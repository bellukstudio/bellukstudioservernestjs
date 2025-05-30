import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Experiences1734080922357 implements MigrationInterface {


    private readonly logger = new Logger(Experiences1734080922357.name);
    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down');
    }

}
