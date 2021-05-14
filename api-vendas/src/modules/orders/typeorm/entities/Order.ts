import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn ,
  Column,
  ManyToOne,
  JoinColumn
    } from 'typeorm';

import Customer from '@modules/customers/typeorm/entities/Customer';

@Entity('order')

class  Order {

@PrimaryGeneratedColumn('uuid')
id: string;

//diz qual é o tipo que está sendo relacionado aqui com o manytoone mts pedido para um client
@JoinColumn({name: 'customer_id'}) //nome da coluna que está se relacionando
@ManyToOne(() => Customer) //VAI TER mts orders para um client , singular pq é 1 client que faz varios pedido
custumer: Customer;//entidade que vai ser exportada pra gente

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;
}

export default Order;
