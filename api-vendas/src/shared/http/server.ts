import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import  AppError  from '@shared/errors/AppError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination'; //é um middleware de paginação

const app = express();

app.use(cors());

app.use(express.json());

app.use(pagination); //declara isso aqui e feito

app.use('/files', express.static(uploadConfig.directory));//qnd acessarmos a rota /files ele vai pegar o coutendo que temos lá no diretorio uploads /files e o nome da imagem qlq imagem que está lá isso já vai estar disponivel no browse pra gente

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction ) => {
if(error instanceof AppError) {
  return response.status(error.statusCode).json({
    status: 'error',
    message: error.message,
  });
}
return response.status(500).json({
  status: 'error',
  message: 'Internal error serve'
})
});

app.listen(3333, () => {//iniciar o servidor app.listen a rota e parametro pra mandar msg
  console.log('Server started 🛩🏆')
});


