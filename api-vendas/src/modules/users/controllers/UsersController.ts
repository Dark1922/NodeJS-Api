import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {
  //index para usar o serviço de listagem
public async index ( request: Request, response: Response ): Promise<Response> {

const listUser = new ListUserService(); //instancia o serviço
//lista de usuario onde agente vai chamar nosso serviço

const users = await listUser.execute(); //método da lista de serviço e vai rodar o nosso find que pega todos os serviços listado de usuarios
return response.json(classToClass(users)); //response.json e retorna os usuario dessa lista
//método index pronto lul
}
  //e o serviço create pra usarmos o createUser né
  public async create( request: Request, response: Response ): Promise<Response> {
    //dados enviado pelo corpo da requisição por isso body
    const { name, email, password } = request.body;

    //cria instancia do serviço
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json(classToClass(user));
  }
}
