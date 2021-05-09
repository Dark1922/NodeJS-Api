import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '@config/upload'; //upload do avatar nome e diretorio
import fs from 'fs';
//biblioteca que nos condição de manipular sistema de arquivo fs

interface IRequest {
  user_id: string; //usuario com o id de quem agt vai fazer o upload massa
  avatarFilename: string;
}

class UptadeUserAvatarService {
  public async execute({ user_id ,avatarFilename}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if(!user) {//se não encontrou o usuario
     throw new AppError('User not found.')
    }
    //verificar se o usuario tem um avatar atualmente
    if(user.avatar) {//tá preenchido n é nulo ta com avatar
       const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

       const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

       if(userAvatarFileExist) {//fs = file sistem
         await fs.promises.unlink(userAvatarFilePath);//unlink método que remove arquivos do sistemas de arquivos
       }
    }
     //cadastar o novo avatar que o usuario enviou
     user.avatar = avatarFilename;
     //agora precisamos atualizar , passa o usuario entidade pelo repositorio
     await usersRepository.save(user);

     return user; //retorna o usuario
  }
}
export default UptadeUserAvatarService;
