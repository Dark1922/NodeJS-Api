import { Request, Response } from "express";
import UptadeUserAvatarService from "../services/UpdateUserAvatarService";

export default class UsersAvatarController {

  //e o serviço create pra usarmos o createUser né
  public async update( request: Request, response: Response ): Promise<Response> {
   const updateAvatar = new UptadeUserAvatarService(); //serviço instanciado

   const user = updateAvatar.execute({//executa os parametros que ele espera lá
    user_id: request.user.id,//temos ele no request.user que fizemos no @types
    avatarFilename: request.file.filename, //ta no file e filename fez no service

   });

    return response.json(user);
  }
}
