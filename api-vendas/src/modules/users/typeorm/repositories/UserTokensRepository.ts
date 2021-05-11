import { EntityRepository, Repository } from 'typeorm'
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken) //vem decorada com entity repository e passamos nossa entidade User
//se extemde ao reposotory do typeorm e ele vai estar lidando com nosso User
 class UserTokensRepository extends  Repository<UserToken>{

  public async findByToken( token: string ): Promise<UserToken | undefined> {
       //PESQUISAR PELO TOKEN
    const userToken = await this.findOne({ //pega o usuario pelo campo name

      where: {
      token, // pega pelo campo name
      },
    });
  return userToken;

  }
  public async Generate( user_id: string ): Promise<UserToken> {
        //GERARADOR DE   TOKEN
    const userToken = await this.create({ //cria user_id criando objeto

        user_id,
    });
   //chamo o repositorio this.save e salva o nosso objeto aqui dessa forma
   //tamo criando um token gerando
    await this.save(userToken)

  return userToken;
  }

}
export default UserTokensRepository;
