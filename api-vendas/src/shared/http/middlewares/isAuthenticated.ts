import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';
//verificar se o usuario está autenticado com o token da nossa api e proteger as rota que precisam ser verificadas
interface ITokenPayload {
  iat:number; //tempo de criação do token qnd foi criado
  exp:number; //tempo de expiração do token
  sub:string; //id do token do usuario id do usuario
  //tudo isso é oque o decodedToken retornar do token do user
}

//como é um middleware ele tem 3 parametros req resp e o next
export default function isAuthenticated(request: Request, response: Response, next: NextFunction):void{
//verificar em cada requisição o cabeçalho se nele existe um token
  const authHeader = request.headers.authorization; //header.authorization onde vira o token
  //o token vai tar dentro do authHeader // solicitar autorização de cabeçalhos

  if(!authHeader) {//se n tiver o token nesse cabeçalho
   throw new AppError('JWT Token is missing.');//n existe token enviado
  }
//uma string que tem 2 parte separado por um espaço ent pegamos isso da forma a baixo
const [, token] = authHeader.split(' ');
//vem 2 parametros o bearer e depois vem o token ent agente só quer o token e corta o bearer
//oque ta sendo retornado aqui é um array ent a posição 0 que é o bearer onde a posição
//0 eu n quero pegar ent só coloca a , e a 1 posiçaõ o token isso que eu quero ali antes da virgula podiamos usar o type como n vamos usar pra anda deixamos suprimido sem nd agora com token armazenado nessa constante que é o token aqui abaixo

//try catch pra pegr as falha é a única forma de pegar elas usando ele a verificação não é feita por nossa aplicação e sim por um bibliote do jsonweb token o verify

try {//vamos pegar um token verificado  do método verify importado do jsonwebtoken
  const decodedToken = verify(token, authConfig.jwt.secret) //onde eu preciso informar pra ele o token e a secret que foi usada para criae esse token ou que deveria ter sido usada a secret que agente quer usar para verificar se esse token foi criado por nossa aplicação  authConfig tem os parametros do nosso token da aplicação , ele quer o token a ser verificado 1 parametro e dps a secret que foi usado na aplicação e ele vai verificar se esse token foi criado com esse secret  se n foi vai dar error

  //ve se ele realmente foi criado pela nossa aplicação se ele é válido se agente pode liberar o acesso

  const { sub } = decodedToken as ITokenPayload;//recebe os dados dessa interface

  //vamos colocar isso dentro do objeto request usuario
  request.user = {
    id: sub, //id que tem como valor o sub , sub tem o id do usuario autenticado
  }//vai ter o id do usuario que ta logado
  //isso vai facilitaro frontend permitir os dados do usuario como o avatar essas coiss
return next(); //para que ele siga em frente com o middleware de autenticação

}catch{//se gerou erro nessa verificação de token

  throw new AppError('Invalid JWT Token.');
}
}
