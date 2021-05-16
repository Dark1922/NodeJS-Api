import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IPaginationCustomer{//vai paginar a lista de cliente
//dados que vai ter das paginas geradas
from: number;
to: number;
per_page: number;
total: number;
current_page: number;
preve_page: number | null; //pagina pra trás number ou null
next_page: number | null; //página pra frente number ou null
data: Customer[]; //como ta trazendo os client e uma array de Customer
}

class ListCustomerService {
  public async execute(): Promise<IPaginationCustomer> {
    const costumersRepository = getCustomRepository(CustomerRepository);
    //paginate é um metodo do queryBuilder
    const costumers = await costumersRepository.createQueryBuilder().paginate();

    return costumers as IPaginationCustomer;
  }
}

export default ListCustomerService ;
