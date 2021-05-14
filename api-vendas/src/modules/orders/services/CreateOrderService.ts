import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';


interface IProduct {
  id: string; //ido do produto string
  quantity: number; //quantidade de produto

}

interface IRequest {
  customer_id: string; //client relacioanado a pedidos de compras
  products: IProduct[] //array de produtos
}

class CreateOrderService {
  //public async execute({ custuomer_id, products }: IRequest): Promise<Order> {
    //const ordersRepository = getCustomRepository(ProductRepository);
   // const productExists = await productsRepository.findByName(name);

   // if (productExists) {
   //   throw new AppError('There is already one product with this name');
   // }


  }
//}

export default CreateOrderService;
