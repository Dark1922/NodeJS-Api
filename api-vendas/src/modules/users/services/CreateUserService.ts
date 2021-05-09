import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    //verificação se ja tem um email cadastrado , se não ele cadastro , se tiver da erro
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('email address already used.');
    }
    //criptografia do password , o 8 é oque ele vai usar pra a geração de criptografia
    const hashedPassword = await hash(password, 8)
    //criação do usuario
    const user = usersRepository.create({
     name,
     email,
     password: hashedPassword, //vai receber o parametro hashed de criptogragia acima
    });
    //salvando o usuario
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
