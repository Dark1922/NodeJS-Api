import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1619823944510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:'users',
          columns: [//array de objeto , cada objeto é uma coluna
            {
              name: 'id', //coluna uuid
              type: 'uuid',
              isPrimary: true, //chave primaria
              generationStrategy: 'uuid',//pq vai usar o uuid
              default: 'uuid_generate_v4()',//versão dos uuid que vai ser gerado

            },
            { //coluna name
              name: 'name',
              type: 'varchar',
            },
            { //coluna email
              name: 'email',
              type: 'varchar',
              isUnique: true, //email unico
            },
            {//coluna password
              name: 'password',
              type: 'varchar',
            },
            { // coluna avatar
              name:'avatar',
              type: 'varchar',
              isNullable: true, //n vai começar preenchendo o avatar, pode ser nulo ent
            },//qnd n informa o isNullable quer dizer que é requerido o campo
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
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
