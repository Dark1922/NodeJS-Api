import {MigrationInterface, QueryRunner, Table} from "typeorm";
import 'uuid'

export class CreateProducts1619560576681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
        new Table({
             name: 'products',
              columns: [
                {
                  name: 'id',
                  type: 'uuid', //id unico universal
                  isPrimary: true, //chave primaria
                  generationStrategy: 'uuid',//pq vai usar o uuid
                  default: 'uuid_generate_v4()',//versão dos uuid que vai ser gerado
                },
                 {
                   name: 'name',
                   type: 'varchar',

                },
                {
                  name: 'price', //preço do produto
                  type: 'decimal',
                  precision: 10, //como ele é decimal bota precision parte inteira do preço
                  scale: 2 , //parte decimal 2 casas
                },
                {
                  name: 'quantity', //quantidade do produto
                  type: 'int', //tipo inteiro
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

              ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products')
    }

}
