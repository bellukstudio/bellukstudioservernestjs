import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Contacts1734080895947 implements MigrationInterface {


    private readonly logger = new Logger(Contacts1734080895947.name);
    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down');
    }

}
