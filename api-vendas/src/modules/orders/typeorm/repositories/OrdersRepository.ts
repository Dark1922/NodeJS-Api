import { EntityRepository, Repository } from 'typeorm'
import Order from '../entities/Order'

@EntityRepository(Order)
 class OrdersRepository extends  Repository<Order>{
  //PARA PEGAR OS DADOS DE UM PEDIDO PELO ID ESPECIFICO
  public async findById( id: string ): Promise<Order | undefined> {
   //retorno é uma promessa que é um Order ou undefined nada
    const order = await this.findOne(id, {//id passa diretamente /pesquisar  1 id
        relations: ['']    //relations de relações
    });

    return order
   //método de fazer a busca de uma order pelo id tem que trazer os dados desse client pelos pedidos e tb uma array dos produtos pedidos
  }
}
export default OrdersRepository;
