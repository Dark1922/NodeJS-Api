import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
//importados o router pra fazer nossa rota
const routes = Router();
//qnd acessarmos o barra products ele vai chamar nosso productsRouter
routes.use('/products', productsRouter);
//define a rota especifica para nossa aplicação
routes.use('/users',usersRouter); //nossa rota de usuario

routes.use('/sessions',sessionsRouter);

export default routes;
