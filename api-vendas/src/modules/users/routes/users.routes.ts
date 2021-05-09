import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarController from '../controllers/UsersAvatarController';


const usersRouter = Router(); //instancio o router

const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();

//configuração multer e passa nosso uploadconfig que fizemos nele
//ent tamos pegando a instancia com as configuração do multer que criamos pro upload
const upload = multer(uploadConfig);

usersRouter.get('/',isAuthenticated, usersController.index); //rota index

usersRouter.post('/', //rota criação de usuario
celebrate({
[Segments.BODY]: {
 name: Joi.string().required(),
 email: Joi.string().email().required(),
 password: Joi.string().required(), //tem q ser um email valido email()
},
}), usersController.create);

usersRouter.patch('/avatar',isAuthenticated,upload.single('avatar'),userAvatarController.update);

export default usersRouter;
