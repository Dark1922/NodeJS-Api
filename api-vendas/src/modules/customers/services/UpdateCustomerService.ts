import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCostumerService {
  public async execute({
    id,
    name,
    email,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customer = await  customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customerExists.email ) {
      throw new AppError('There is already one Customer with this email');
    }
    //se o email for igual aos que os outros customer/cliente usam
    //vai dar error no cadastro
    customer.name = name;
    customer.email =email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCostumerService;
