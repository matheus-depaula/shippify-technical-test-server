import {MigrationInterface, QueryRunner} from "typeorm";

export class alterDrivers1650976173724 implements MigrationInterface {
    name = 'alterDrivers1650976173724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drivers\` CHANGE \`avatar_url\` \`avatar_url\` varchar(200) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drivers\` CHANGE \`avatar_url\` \`avatar_url\` varchar(200) NOT NULL`);
    }

}
