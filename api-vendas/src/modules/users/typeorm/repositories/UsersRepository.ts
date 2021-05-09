import { EntityRepository, Repository } from 'typeorm'
import User from '../entities/User'

@EntityRepository(User) //vem decorada com entity repository e passamos nossa entidade User
//se extemde ao reposotory do typeorm e ele vai estar lidando com nosso User
 class UsersRepository extends  Repository<User>{

  public async findByName( name:string ): Promise<User | undefined> {

    const user = await this.findOne({ //pega o usuario pelo campo name

      where: {
      name, // pega pelo campo name
      },
    });
  return user;

  }
  public async findById( id:string ): Promise<User | undefined> {

    const user = await this.findOne({ //pega o usuario pelo id

      where: {
        id, // pega pelo campo id
      },
    });
  return user;

  }
  public async findByEmail( email:string ): Promise<User | undefined> {

    const user = await this.findOne({ //pega o usuario pelo email

      where: {
        email, // pega pelo email
      },
    });
  return user;

  }

}
export default UsersRepository;
