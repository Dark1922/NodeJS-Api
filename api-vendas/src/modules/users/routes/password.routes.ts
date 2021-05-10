import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';


const passwordRouter = Router(); //instancio o router

const forgotPasswordController = new ForgotPasswordController(); //instancio da classe do ns controller
const resetPasswordController = new ResetPasswordController();

//http://localhost:3333/password/forgot
passwordRouter.post('/forgot', //rota de recuperação de senha
celebrate({
[Segments.BODY]: {
 email: Joi.string().email().required(),
},
}), forgotPasswordController.create);

//http://localhost:3333/password/reset
passwordRouter.post('/reset', //rota de recuperação de senha
celebrate({
[Segments.BODY]: {
  token: Joi.string().uuid().required(),
  password: Joi.string().required(),
  password_confirmation: Joi.string().required().valid(Joi.ref('password'))
//se a senha de igual da de cima tudo certa a confirmação de senha e a senha massa
//passamos Joi.ref('password'); que é a referencia que ele quer validar ou comparar
//se os dadose estão corretos um com o outro , esse campo tem que ser igual ao campo
//que está sendo passado para o ref = referencia
},
}), resetPasswordController.create);

export default passwordRouter;
