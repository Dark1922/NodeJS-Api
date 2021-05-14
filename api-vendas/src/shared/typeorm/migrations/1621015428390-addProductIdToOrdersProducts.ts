import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addProductIdToOrdersProducts1621015428390 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products', //nome da tabela relacionada pra adicionar a coluna nela
        new TableColumn({
           name: 'product_id',//campo que vamos adicionar
           type: 'uuid',
           isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
          'orders_products', //tabela que vai ser criado a chave estrangeira
          new TableForeignKey({//nome da forenkey abaixo
            name: 'OrdersProductsProduct',//um ou mais serviçõs de uma order por isso esse nome
            columnNames: ['product_id'],
            referencedTableName: 'products',//tabela de referencia
            referencedColumnNames: ['id'],//campo id e tabela product
            onDelete: 'SET NULL',
          })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'OrdersProductsProduct');
      await queryRunner.dropColumn('orders_products', 'product_id');
    }

}
