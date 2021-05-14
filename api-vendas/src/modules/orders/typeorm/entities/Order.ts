import Customer from "@modules/customers/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";


@Entity('order')

class Order {

@PrimaryGeneratedColumn('uuid')
id: string;

@JoinColumn({name: 'customer_id'})

@ManyToOne(() => Customer)
custumer: Customer;

@OneToMany(() => OrdersProducts, order_products => order_products.order, {
  cascade: true,
})
order_products: OrdersProducts[];

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;
}

export default Order;
