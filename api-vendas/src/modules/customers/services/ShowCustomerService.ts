import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCostumerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const costumersRepository = getCustomRepository(CustomersRepository);

    const costumer = await costumersRepository.findOne(id);

    if (!costumer) {
      throw new AppError('Customer not found.');
    }

    return costumer;
  }
}

export default ShowCostumerService;
