import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1621014232997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products', //nome da tabela relacionada pra adicionar a coluna nela
        new TableColumn({
           name: 'order_id',//campo que vamos adicionar
           type: 'uuid',
           isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
          'orders_products', //tabela que vai ser criado a chave estrangeira
          new TableForeignKey({//nome da forenkey abaixo
            name: 'OrdersProductsOrder',//um ou mais serviçõs de uma order por isso esse nome
            columnNames: ['order_id'],
            referencedTableName: 'orders',//tabela de referencia
            referencedColumnNames: ['id'],//campo id e tabela orders
            onDelete: 'SET NULL',
          })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
      await queryRunner.dropColumn('orders_products', 'order_id');
    }

}
