import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';



  const profileRouter = Router(); //instancio o router
  const profileController = new ProfileController();
  profileRouter.use(isAuthenticated);
//ele sendo chamado antes de rodas rotas ele vai ser aplicado a todas rotas que vierem depois dele e exigindo que o usuario esteje autenticado pra acessar qualquer rota aqui

  profileRouter.get('/', profileController.show); //rota iexibir perfil

  profileRouter.put('/', //atualizão de dados do perfil
  celebrate({
  [Segments.BODY]: {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  old_password: Joi.string(),//n pode exigir que o usuario troque a senha dele ent sem required
  password: Joi.string().optional(),//optional pode ser e tb n requerido
  password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
    is: Joi.exist(), //password existe ta preenchido
    then: Joi.required(),
  }), //o valor que ta nesse campo aqui tem que estár igual ao do cmp  password atráves do valid Joi ref password se for diferente  essa validação critica , is: se password existe está preenchido então inclua no password_confirmation o required é uma forma condicional da gente atribuir o required pro password_confirmation desde que o password esteja preenchido e o valid ref pra dizer que o password tem que ser igual ao do password_confirmation.

 },
   }), profileController.update);

    export default profileRouter;
