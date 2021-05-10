import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router(); //instancio o router

const forgotPasswordController = new ForgotPasswordController(); //instancio da classe do ns controller
//rota sem corpo ou parametro de requisição ent n precisa validar nd chama direto

//http://localhost:3333/password/forgot
passwordRouter.post('/forgot', //rota de recuperação de senha
celebrate({
[Segments.BODY]: {
 email: Joi.string().email().required(),
},
}), forgotPasswordController.create);

export default passwordRouter;
