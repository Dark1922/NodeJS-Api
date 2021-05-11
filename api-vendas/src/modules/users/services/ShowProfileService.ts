import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    //passa direto o user_id que vai receber o id do usuario Pelo
    //método findById do repositoriouser
    const user = await usersRepository.findById(user_id);

    //if not user náo é o usuario se n receber o id do usuario
    if(!user) {
      throw new AppError('User not found.')
    }

    return user;
  }
}

export default ShowProfileService;
