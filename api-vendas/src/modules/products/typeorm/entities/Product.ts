import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import {
     Column,
     CreateDateColumn,
     Entity,
     OneToMany,
     PrimaryGeneratedColumn,
     UpdateDateColumn,
       }
     from 'typeorm'


@Entity('products') //nome da tabela

class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; //uuid id do produto

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

  @Column()
  name: string; //nome

  @Column('decimal') //tipo que vai ser usado pelo typeorm vai fazer esse mapeamento
  price: number; //preço

  @Column('int') //inteiro numero fazemos isso pra qnd queremos dados especificos deles
  quantity: number; //quantidade do produto

  @CreateDateColumn()
  created_at: Date; //data criação

  @UpdateDateColumn()
  updated_at: Date; //data atualização
}
export default Product;
