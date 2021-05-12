import { Router } from 'express';
import  CustumersController  from '../controller/CustomersController';
import { celebrate, Joi, Segments } from 'celebrate';

const customersRouter =  Router();

const customersController = new CustumersController();

customersRouter .get('/', customersController.index)

customersRouter .get( '/:id',
celebrate({//cada validação vem de dentro de uma array e vamos validar um parametro
[Segments.PARAMS]:{//conteudo verificado por essa validação massa vlh
 id: Joi.string().uuid().required(),  //joi.string pq ele é uma string do tipo uuid tb e ela tem que ser requerida
}
}), customersController.show);

customersRouter .post('/',
celebrate({
[Segments.BODY]: { //corpo da nossa página ou requisição dados requerido
 name: Joi.string().required(),
 email: Joi.string().email().required(),

}
}), customersController.create);

customersRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
   name: Joi.string().required(),
   email: Joi.string().email().required(),
  },
  [Segments.PARAMS]:{
    id: Joi.string().uuid().required(),
   }
}),customersController.update);



customersRouter.delete('/:id',
celebrate({
  [Segments.PARAMS]:{
   id: Joi.string().uuid().required(),
  }
  }),customersController.delete);


export default customersRouter ;




