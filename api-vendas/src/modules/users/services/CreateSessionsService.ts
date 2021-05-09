import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth'
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;   //que o usuario vai usar pra logar
  password: string;
}
interface IResponse {
  user: User; //vamos tem um usuario do tipo User do entites
  token: string;
}
class CreateSessionsService {
  public async execute({  email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
     //verificar se existe um email vou pegar um usuario no repositorio apartir do email
    const user = await usersRepository.findByEmail(email);
    if (!user) {//se o usuario n existe em nossa aplicação ele dispara um erro
      throw new AppError('Incorrect email/password combination.', 401);
    }//401 error de autenticação com esse estatus code vc n está valido a se autenticar

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {//se a senha está incorreta da o msm erro
      throw new AppError('Incorrect email/password combination.', 401);
    }
   //se passou disso temos ctz que o email e o password está correto e tb na nossa base de dados
   //depois do usuario estiver logado vamos fazer nosso token
   const token = sign({}, authConfig.jwt.secret ,  { //recebe 3 parametro id do usuario o hash qual vai ser o secret secreto qual vai ser usado pra criar esse token
    subject: user.id, //subjetivo é o id do usuario
    expiresIn: authConfig.jwt.expiresIn //tempo que esse token vai expirar, pra fazer uma nova session de login
   } )
    return { user, token };
  }
}
export default CreateSessionsService;
