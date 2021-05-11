import { EntityRepository, Repository } from 'typeorm';
import Customers from '../entities/Customer';

@EntityRepository(Customers)
 class CustomersRepository extends Repository<Customers>{

  public async findByName( name: string, email: string): Promise<Customers | undefined> {

    const client = await this.findOne({

      where: {
      name,
      email,
      },
    });

  return client;

  }
}
export default CustomersRepository;
