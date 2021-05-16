import Customer from '@modules/customers/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm'
import Order from '../entities/Order'

interface IProduct {
  //dados que quero dos produto
  product_id: string,
  price: number,
  quantity: number;
}
interface IRequest {
   customer : Customer; //entidade customers
  products: IProduct[]; //os dados que queremos do produto
  //não é um unico produto ent é um array pq pode ter mais de um
}

@EntityRepository(Order)
 class OrdersRepository extends Repository<Order>{
  //PARA PEGAR OS DADOS DE UM PEDIDO PELO ID ESPECIFICO
  public async findById( id: string ): Promise<Order | undefined> {
   //retorno é uma promessa que é um Order ou undefined nada
    const order = await this.findOne(id, {//id passa diretamente no findOne(id)
        relations: ['order_products', 'customer']    //relations de relações dentro de objeto
    });//quais relações eu quero trazer os dados, tamos falando pro findOne que alem de trazer todos dados this da order do pedido ele tb trazer os dados relacionados a esse pedido desse id no finOne e trazer tb quem é o client customer  com todos dados deles e quais produtos foram comprados ou foram pedidos por esse client vai trazer tudo pra gente

    return order
   //método de fazer a busca de uma order pelo id tem que trazer os dados desse client pelos pedidos e tb uma array dos produtos pedidos
  }
  public async createOrder( { customer, products}: IRequest): Promise<Order> {
   //nome do método que nós damos , quais são os dados enviados pela requisição do client do usario pra poder criar uma order em nossa aplicação vamos criar um interface pra isso lá encima abaixo dos import, vamos criar um pedido n precisa de undefined
   const order = this.create({//cria o objeto onde os dado tem que ser salvo
      customer,
      order_products: products, //passa esse elemento da interfac pro products
   });

    await this.save(order) //salva o objeto criado

    return order
  }
}
export default OrdersRepository;
//temos que trazer os dados do client desse pedido e tv um array com os produto pedidos
