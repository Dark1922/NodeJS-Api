import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {

  //método para criar o token
  public async create( request: Request, response: Response ): Promise<Response> {
    //dados enviado pelo corpo da requisição por isso body
    const { password , token } = request.body; //vai precisar password token

    //cria instancia do resetpassorwd service
    const resetPasswordEmail = new ResetPasswordService();

    await resetPasswordEmail.execute({
      //ele vai executar passando o password pra ele e o token nosso service reset
      //ele e um Promise<void> ent n retorna nd por isos só await e a execução
      password,
      token
    });
    //status 204 pro front end se tudo ocorreu bem tudo funcionou com o esperado mas n tem nenhum conteudo pra ser retornado
    return response.status(204).json();
  }
}
