import { classToClass } from 'class-transformer';
import {Request, Response} from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {

public async create( request: Request, response: Response ): Promise<Response> {
  const { email, password } = request.body; //agente recebe o email e senha no corpo da requisição
  //para que o usuario se autentique, ai desestrutura eles

  //instancia o nosso serviço que já foi criado
  const createSessionsService = new CreateSessionsService();

  const  user = await createSessionsService.execute({
    email,   //informa os dois campo que o usuario vai se
    password
  });

  return response.json(classToClass(user));
};
}
