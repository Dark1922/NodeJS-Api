import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs'


interface IRequest {
  token: string;
  password: string;

}

class ResetPasswordService {  //void precisa retornar nada
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    //instanciação dos nossos dois repositorios


    //pra verificar o token se é valido ou n passa o método do token usertokenrepository
    const userToken = await userTokensRepository.findByToken(token);

    if(!userToken) {//se o token for invalido
      throw new AppError('user token does not exists.');
    }
    //se passou daqui vai verificar se o usuario existe em nossa aplicação
    //vai passar nosso usertoken e o user_id , se o usuario é valido se n if not
    const user = await usersRepository.findById(userToken.user_id);
    //ele tem uma forenkey do usuario user_id

    if(!user) {//se o usuario n existi
      throw new AppError('user  does not exists.');
    }
    //precisa saber se o token ai está com prazo de validade
    //vamos pegar a data de criação do token
    const tokenCreatedAt = userToken.created_at;
    //passamos nosso tokenCreatedAt que é qnd foi criado e horas 2
    const compareDate = addHours(tokenCreatedAt, 2);
     //verificar se a data passou método do date-fns
     //isAfter se está depois de date.now data de agora passou está no passo essas 2 horas
     //que passamos está no passado ent  vamos expirar esse token
    if(isAfter(Date.now(), compareDate)) {//se passou a data de agora e manda o compareDate
       throw new AppError('Token expired.')
    }
    //se depois de todas essas verificações agente n caiu em um throw new está tudo válido
    //ai sim agente atualiza a senha do usuario

//a senha do usuario vai receber a que ele passou , criptografia de senha
    user.password = await hash(password, 8);

    await usersRepository.save(user); //salvar o reset de senha do usuario
  }
}

export default  ResetPasswordService;
