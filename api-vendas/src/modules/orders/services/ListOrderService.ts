import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrdersRepository';

class  ListOrderService {
  public async execute(): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrderRepository);

    const order = ordersRepository.find();

    return order;
  }
}

export default ListOrderService;
