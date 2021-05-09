import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();//vai receberu ma lista do find do repositorio de usuario e vai nos retornar a lista dos usuarios criado

    return users;
  }
}

export default ListUserService;
