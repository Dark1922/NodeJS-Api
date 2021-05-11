import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
  email: string;

}

class SendForgotPassworEmaildService {  //void precisa retornar nada
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    //instanciação dos nossos repositorios , vamos precisar só do email aqui
    //vai mandar pra recuperar a senha por um email valido

    //pra verificar isso vamos pegar o user do repositorios nosso método email que criamos e o email que foi enviado por parametro no método execute criado acima
    const user = await  usersRepository.findByEmail(email);

    if(!user) {//se o email n existe agente dispara uma função de error que criamos
      throw new AppError('User does not exists')
    }
    //Se o email existir  vamos gerar um token pra esse usuarios, e passamos o user de cima . id que é um dos métodos do repositorio do user
    const { token } = await userTokensRepository.Generate(user.id);

    //path temos o método resolve que nos ajuda ai no caminho pra chegar em certo arquivo
    //__dirname vai pegar a referencia daonde agente estamos nosso arquivo atual
    //descemos 1 nivel '..' para user e votamos a pasta views e o arquivo que queriamos apos ela
    const forgotPasswordTemplate = path.resolve(__dirname,'..', 'views', 'forgot_password.hbs');

    //Configurações do Ethereal e seus metodos que fizemos padrão dele
    await EtherealMail.sendMail({
       to: {
        name: user.name,
        email: user.email,
       },
       subject: '[API Vendas] Recuperação de Senha',
       templateData: {
        file: forgotPasswordTemplate, //nosso arquivo handlebars com css html
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
          //como se tivessemos uma rota front end mandando um token contendo o link
          //de troca do password aplicação front end com esse token aqui vai conseguir montar a estrutura que consiga pegar esse token e enviar pra nossa requisição reset_passoword aonde agente pega o token e a senha
        },
       },
    });

  }
}

export default SendForgotPassworEmaildService;
