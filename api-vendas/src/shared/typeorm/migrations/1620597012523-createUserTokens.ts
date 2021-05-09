import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUserTokens1620597012523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'user_tokens',
          columns: [
            {
              name: 'id', //coluna uuid
              type: 'uuid',
              isPrimary: true, //chave primaria
              generationStrategy: 'uuid',//pq vai usar o uuid
              default: 'uuid_generate_v4()',//versão dos uuid que vai ser gerado

            },

            {
              name: 'token', //coluna token
              type: 'uuid',
              generationStrategy: 'uuid',//pq vai usar o uuid
              default: 'uuid_generate_v4()',//versão dos uuid que vai ser gerad
            },
            {//coluna usuario
              name: 'user_id',
              type: 'uuid', //vai armazenar o id do usuario
            },

            {
              name: 'created_at', //qnd foi criado o registro
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at', //qnd foi atualizado
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'TokenUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate:  'CASCADE',
            }
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_tokens')
    }

}
