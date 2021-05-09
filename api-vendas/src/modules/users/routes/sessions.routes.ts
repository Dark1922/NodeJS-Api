import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router(); //instancio o router

const sessionsController = new SessionsController(); //instancio da classe do ns controller
//rota sem corpo ou parametro de requisição ent n precisa validar nd chama direto


sessionsRouter.post('/', //rota criação de usuario
celebrate({
[Segments.BODY]: {//Segments.BODY vai validar email e senha
 email: Joi.string().email().required(),
 password: Joi.string().required(), //tem q ser um email valido email()
},
}), sessionsController.create );

export default sessionsRouter;
