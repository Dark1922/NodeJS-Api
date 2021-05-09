import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';
//verificar se o usuario está autenticado com o token da nossa api e proteger as rota que precisam ser verificadas
interface ITokenPayload {
  iat:number; //tempo criação do token
  exp:number; //tempo de expiração do token
  sub:string; //id do token do usuario
  //tudo isso é oque o decodedToken retornar do token do user
}

//como é um middleware ele tem 3 parametros req resp e o next
export default function isAuthenticated(request: Request, response: Response, next: NextFunction):void{
//verificar em cada requisição o cabeçalho se nele existe um token
  const authHeader = request.headers.authorization; //header.authorization onde vira o token
  if(!authHeader) {//se n tiver o token nesse cabeçalho
   throw new AppError('JWT Token is missing.');//n existe token enviado
  }

const [, token] = authHeader.split(' ');


try {//vamos pegar um token verificado  do método verify importado do jsonwebtoken
  const decodedToken = verify(token, authConfig.jwt.secret) //onde eu preciso informar pra ele o token q

  const { sub } = decodedToken as ITokenPayload;//recebe os dados dessa interface

  //vamos colocar isso dentro do objeto request usuario
  request.user = {
    id: sub, //id que tem como valor o sub
  }
return next(); //para que ele siga em frente o middleware
}catch{//se gerou erro nessa verificação de token

  throw new AppError('Invalid JWT Token.');
}
}
