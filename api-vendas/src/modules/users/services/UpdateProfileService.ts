import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string; //senha anterior ou atual pra atualizar
}

class UpdateProfileService {
  public async execute({
  user_id, name, email, password, old_password }: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UserRepository);

    //método do userRepository recebe o id do user e verifica abaixo
    const user = await usersRepository.findById(user_id);

    //vai verificar se o usuario existe com o id do repositoriy
    if(!user) {
      throw new AppError('User not found.')
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if(userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email')
    }
     //recebe uma senha e n existe uma old_password n vai deixar trocar a senha
    if(password && !old_password) {
       throw new AppError('Old Passaword is required.');
    }
    //fazer uma verificação se a senha antiga dele é igual a q ta no banco de dados
    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError('Old Password does not match.');
      }
      //se passou dos dois if a senah pode ser alterada e criptografada na aplicação
      user.password =  await hash(password, 8);
    }

    user.name = name;   //passa o email novo
    user.email = email; //passa o nome novo

    await usersRepository.save(user); //salva os dado do usuario

    return user;
  }
}

export default UpdateProfileService;
