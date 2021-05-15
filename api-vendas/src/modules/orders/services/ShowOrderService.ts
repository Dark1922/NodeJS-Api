import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string; //client relacioanado a pedidos de compras

}

class ShowOrderService {
  public async execute({ id  }: IRequest): Promise<Order> {
    const oderRepository  = getCustomRepository(OrdersRepository);

   const order = await oderRepository.findById(id);

   if (!order) {
     throw new AppError('Order not found');
   }


  return order;
}
}

export default ShowOrderService;
