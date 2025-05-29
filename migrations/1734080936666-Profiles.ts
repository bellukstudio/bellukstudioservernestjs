import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Profiles1734080936666 implements MigrationInterface {


    private readonly logger = new Logger(Profiles1734080936666.name);
    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down');
    }
}
