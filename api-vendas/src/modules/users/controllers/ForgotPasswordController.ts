import { Request, Response } from "express";
import SendForgotPassworEmaildService from "../services/SendForgotPassworEmaildService";


export default class ForgotPasswordController {

  //método para criar o token
  public async create( request: Request, response: Response ): Promise<Response> {
    //dados enviado pelo corpo da requisição por isso body
    const { email } = request.body; //vai precisar do email apenas

    //cria instancia do serviço se enviar pro email a recuperação de senha
    const sendForgotPasswordEmail = new SendForgotPassworEmaildService();

    await sendForgotPasswordEmail .execute({ //como n retorna nada do service forgot faz direto pelo await massa qnd o retorno da promessa é void loco
      email, //vai passar pra ele somento o email
    });
    //status 204 pro front end se tudo ocorreu bem tudo funcionou com o esperado mas n tem nenhum conteudo pra ser retornado
    return response.status(204).json();
  }
}
