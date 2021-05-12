import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
//importados o router pra fazer nossa rota
const routes = Router();
//qnd acessarmos o barra products ele vai chamar nosso productsRouter
routes.use('/products', productsRouter);
//define a rota especifica para nossa aplicação
routes.use('/users',usersRouter); //nossa rota de usuario

routes.use('/sessions',sessionsRouter);

routes.use('/password', passwordRouter);

routes.use('/profile', profileRouter);

routes.use('/customers', customersRouter);

export default routes;
