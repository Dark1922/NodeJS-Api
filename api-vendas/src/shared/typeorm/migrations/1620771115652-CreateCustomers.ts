import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers1620771115652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:'customers',
          columns: [
            {
             name: 'id',
             type: 'uuid',
             isPrimary: true, //chave primaria
             generationStrategy: 'uuid',//pq vai usar o uuid
             default: 'uuid_generate_v4()',//versão dos uuid que vai ser gerado
            },
            {
              name: 'name',
              type: 'varchar',
            },
             {
               name: 'email',
               type: 'varchar',
             },
             {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
             },
             {
               name: 'updated_at',
               type: 'timestamp',
               default: 'now()',
             },
          ],
        }),
      );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customers');
    }

}
