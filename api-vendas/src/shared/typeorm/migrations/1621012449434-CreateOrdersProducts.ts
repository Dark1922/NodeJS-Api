import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrdersProducts1621012449434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
             name: 'orders_products',//tem referencia com orders  e produtos
              columns: [
                {
                  name: 'id',
                  type: 'uuid', //id unico universal
                  isPrimary: true, //chave primaria
                  generationStrategy: 'uuid',//pq vai usar o uuid
                  default: 'uuid_generate_v4()',//versão dos uuid que vai ser gerado
                },

                {
                  name: 'price', //registrar o preço da venda
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

              ],
        }),
      );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orders_products')
    };

};
