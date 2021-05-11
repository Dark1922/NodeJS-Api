import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

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

    //console.log(token); //olha o token que tava vindo pra trocar senha

    //Configurações do Ethereal e seus metodos que fizemos padrão dele
    await EtherealMail.sendMail({
       to: {
        name: user.name,
        email: user.email,
       },
       subject: '[API Vendas] Recuperação de Senha',
       templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,//token: token.token com o token da const sem {objeto},
          //como o token tem o msm nome doq vai ser passado deixa só o token
        }
       },
    });

  }
}

export default SendForgotPassworEmaildService;
