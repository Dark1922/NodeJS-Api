import { Router } from 'express';
import  OrdersController  from '../controller/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersRouter =  Router();

const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/', ordersController.index)

ordersRouter.get( '/:id',
celebrate({//cada validação vem de dentro de uma array e vamos validar um parametro
[Segments.PARAMS]:{//conteudo verificado por essa validação massa vlh
 id: Joi.string().uuid().required(),  //joi.string pq ele é uma string do tipo uuid tb e ela tem que ser requerida
}
}), ordersController.show);

ordersRouter.post('/',
celebrate({
[Segments.BODY]: { //corpo da nossa página ou requisição dados requerido
 customer_id: Joi.string().uuid().required(),
 products: Joi.required(),

}
}), ordersController.create);




export default ordersRouter;




