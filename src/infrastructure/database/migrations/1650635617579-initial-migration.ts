import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1650635617579 implements MigrationInterface {
    name = 'initialMigration1650635617579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`creation_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`plate\` varchar(100) NOT NULL, \`model\` varchar(100) NOT NULL, \`type\` enum ('0', '1', '2') NOT NULL, \`capacity\` varchar(20) NOT NULL, \`driver_id\` int NULL, UNIQUE INDEX \`IDX_51922d0c6647cb10de3f76ba4e\` (\`plate\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`driver\` (\`id\` int NOT NULL AUTO_INCREMENT, \`creation_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(20) NOT NULL, \`avatar_url\` varchar(200) NOT NULL, \`status\` enum ('ACTIVE', 'DISABLED') NOT NULL, \`company_id\` int NULL, UNIQUE INDEX \`IDX_bb2050b01c92e5eb0ecee4c77f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`creation_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`city\` int NOT NULL, \`status\` enum ('ACTIVE', 'DISABLED') NOT NULL, \`plan_type\` enum ('BASIC', 'INTERMEDIATE', 'ADVANCED') NOT NULL, UNIQUE INDEX \`IDX_a76c5cd486f7779bd9c319afd2\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` ADD CONSTRAINT \`FK_afcca29758a493752b3f133b65a\` FOREIGN KEY (\`driver_id\`) REFERENCES \`driver\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`driver\` ADD CONSTRAINT \`FK_3b13e71bc6059b75ec5801f863d\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`driver\` DROP FOREIGN KEY \`FK_3b13e71bc6059b75ec5801f863d\``);
        await queryRunner.query(`ALTER TABLE \`vehicle\` DROP FOREIGN KEY \`FK_afcca29758a493752b3f133b65a\``);
        await queryRunner.query(`DROP INDEX \`IDX_a76c5cd486f7779bd9c319afd2\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb2050b01c92e5eb0ecee4c77f\` ON \`driver\``);
        await queryRunner.query(`DROP TABLE \`driver\``);
        await queryRunner.query(`DROP INDEX \`IDX_51922d0c6647cb10de3f76ba4e\` ON \`vehicle\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
    }

}
