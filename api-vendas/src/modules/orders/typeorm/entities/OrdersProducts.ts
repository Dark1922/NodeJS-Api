import Order from "./Order";
    import {
      Column,
      CreateDateColumn,
      Entity,
      JoinColumn,
      ManyToOne,
      PrimaryGeneratedColumn,
      UpdateDateColumn
           }
    from "typeorm";
import Product from "@modules/products/typeorm/entities/Product";


@Entity('orders_products')

class OrdersProducts {

@PrimaryGeneratedColumn('uuid')
id: string;

//vai liberar aqui dps de configurar o order.ts
@ManyToOne(() => Order, order => order.order_products)
@JoinColumn({name: 'order_id'})
order: Order;//é uma só pq orders manytoOne muitos para uma order pedido ou seja muitos produtos para um pedido ou em um pedido é simplesmente uma instancia n tem array aqui


//Tenho mts orders_products PARA um PRODUTO atráves desse produto eu consigo pegar todos OrdersProducts que es~toa relacionado a ele
@ManyToOne(() => Product, product => product.order_products)
@JoinColumn({name: 'product_id'})//coluna que faz a relação ao banco de dados vai fazer com a product_id e a order_id lá encima
product: Product;//o campo que temos aqui e pra entidade Product

@Column('int')
quantity: number;

@Column('decimal')
price: number;

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;
}

export default OrdersProducts;
