import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusAsDefault1650836206122 implements MigrationInterface {
    name = 'addStatusAsDefault1650836206122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`status\` enum ('ACTIVE', 'DISABLED') NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`status\``);
    }

}
