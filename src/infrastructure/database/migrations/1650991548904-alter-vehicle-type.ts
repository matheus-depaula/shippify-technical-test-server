import {MigrationInterface, QueryRunner} from "typeorm";

export class alterVehicleType1650991548904 implements MigrationInterface {
    name = 'alterVehicleType1650991548904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` CHANGE \`type\` \`type\` enum ('CAR', 'MOTORCYCLE', 'TRUCK') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` CHANGE \`type\` \`type\` enum ('0', '1', '2') NOT NULL`);
    }

}
