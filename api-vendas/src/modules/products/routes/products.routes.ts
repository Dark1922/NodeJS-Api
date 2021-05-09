import { Router } from 'express';
import  ProductsController  from '../controller/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter =  Router();

const productsController = new ProductsController();

productsRouter.get('/', productsController.index)

productsRouter.get( '/:id',
celebrate({//cada validação vem de dentro de uma array e vamos validar um parametro
[Segments.PARAMS]:{//conteudo verificado por essa validação massa vlh
 id: Joi.string().uuid().required(),  //joi.string pq ele é uma string do tipo uuid tb e ela tem que ser requerida
}
}), productsController.show);

productsRouter.post('/',
celebrate({
[Segments.BODY]: { //corpo da nossa página ou requisição dados requerido
 name: Joi.string().required(),
 price: Joi.number().precision(2).required(), //que esses dados são requeridos ao cadastrar
 quantity: Joi.number().required(),
}//precision(2) quantidade de cadas decimais do preõ tipo 199.99 saca
}), productsController.create);

productsRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
   name: Joi.string().required(),
   price: Joi.number().precision(2).required(),
   quantity: Joi.number().required(),
  },
  [Segments.PARAMS]:{
    id: Joi.string().uuid().required(),
   }
}),productsController.update);



productsRouter.delete('/:id',
celebrate({
  [Segments.PARAMS]:{
   id: Joi.string().uuid().required(),
  }
  }),productsController.delete);


export default   productsRouter;




