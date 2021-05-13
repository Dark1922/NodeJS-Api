import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1620927847855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'orders',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',//pq vai usar o uuid
                default: 'uuid_generate_v4()',
              },
              {
                name:'created_at',
                type: 'timestamp',
                default:'now()',
              },
              {
                name:'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
            ],
          }),
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orders');
    }

};
