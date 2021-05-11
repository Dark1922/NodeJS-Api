import nodemailer from 'nodemailer';
import handlebarMailTemplate from './HandlebarMailTemplate';
import HandlebarMailTemplate from './HandlebarMailTemplate';

interface ItemplateVariable {
  [key: string]: string | number; //string ou number
  //eu vou ter uma interface com propriedades em que a chave vai ser do tipo string e o conteudo pode ser string ou numeros
}
interface IParseMailTemplate {
  template: string;
  variables:ItemplateVariable; //vai ser do tipo da interface acima
}
interface IMailContact { //complementação do to
  name: string;
  email: string;
}
interface ISendMail {
  to: IMailContact;
  templateData:IParseMailTemplate; //vai conter o template e as variaveis
  from?: IMailContact; //tem o email e o nome de quem ta enviando
  subject: string;
}//interface para definir o tipo do parametro abaixo to ,body e da message


export default class EtherealMail {
  //temos um método sendForgotPasswordEmail static para facilitar a forma de usar
  //método sendMail
  static async sendMail({ to, from, subject, templateData }: ISendMail ): Promise<void> {

   //ele vai criar essa conta fake pra gente createTestAccount vem do nodemailer
     const account = await nodemailer.createTestAccount();

     const mailTemplate = new handlebarMailTemplate();//instancia o template

     //método do nodemailer também create transport
     const transporter = nodemailer.createTransport({
       //vamos passar os objeto aqui , tudo do nodemailer
       host: account.smtp.host,
       port: account.smtp.port,
       secure:  account.smtp.secure,
       auth: {
         user: account.user,
         pass: account.pass,
       },
     });
       //esse método tb recebe um objeto
     const message = await transporter.sendMail({
       from: {//from do sendMail do transporter acima
        name: from?.name || 'Equipe api vendas', //nome
        address: from?.email || 'equipe@apivendas.com.br', //address = email
       } ,
       to: {
         name: to.name,
         address: to.email, //email
       },
       subject,
       html: await mailTemplate.parse() , //método do nosso template como ele é async aqui bota await
     });
     //%s  é pra gente pegar o valor da variavel que agente ta passando depois da virgula
     //e incluir na mensagem
     console.log('Message sent: %s', message.messageId);
     console.log('preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}
