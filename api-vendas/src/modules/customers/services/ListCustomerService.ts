import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const costumersRepository = getCustomRepository(CustomerRepository);
  //lista de client retorna uma lista o método find
    const costumers = costumersRepository.find();

    return costumers;
  }
}

export default ListCustomerService ;
