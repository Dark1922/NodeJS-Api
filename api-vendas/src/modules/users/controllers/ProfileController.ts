import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

 export default class ProfileController {

  public async show( request: Request, response: Response ): Promise<Response> {

  const showProfile = new ShowProfileService();

  const user_id  = request.user.id;

  const user = await showProfile.execute({ user_id });

  return response.json(user);
}

  public async update( request: Request, response: Response ): Promise<Response> {

    const user_id  = request.user.id;
                                          //tudo vindo do corpo da requisição
    const { name, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileService(); //instancia o serviço

    const user = await updateProfile.execute({//passa todos parametros que ele precisa
      user_id,
      name,
      email,
      password,
      old_password
    });
    return response.json(user); //retorna um json com esse usuario
  }
}
