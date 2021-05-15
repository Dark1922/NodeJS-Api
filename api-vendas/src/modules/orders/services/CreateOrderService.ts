import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string; //ido do produto string
  quantity: number; //quantidade de produto
}
interface IRequest {
  customer_id: string; //client relacioanado a pedidos de compras
  products: IProduct[] //array de produtos interface acima
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);//instancias
    const customerRepository = getCustomRepository(CustomersRepository);
    const productRepository = getCustomRepository(ProductsRepository);

    //temos que garantir que client exista que os produto exista que cada produto tenha quantidade suficiente
    const customerExist = await customerRepository.findById(customer_id);
     //passa o id do client que está no repositorio para customer_id e verificamos abaizo
    if (!customerExist) {//verificar se o cliente não existe
     throw new AppError('Could not find any Customer with the given id.');
    }


  }
}

export default CreateOrderService;
