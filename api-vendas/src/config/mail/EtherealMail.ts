import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}//interface para definir o tipo do parametro abaixo to ,body

export default class EtherealMail {
  //temos um método sendForgotPasswordEmail static para facilitar a forma de usar
  //método sendMail
  static async sendMail({ to, body }: ISendMail ): Promise<void> {

   //ele vai criar essa conta pra gente createTestAccount vem do nodemailer
     const account = await nodemailer.createTestAccount();

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
       from: 'equipe@apivendas.com.br', //email de teste
       to, //email fake n precisa saber pra quem ta sendo enviado
       subject: 'Recuperação de senha',
       text: body,
     });
     //%s  é pra gente pegar o valor da variavel que agente ta passando depois da virgula
     //e incluir na mensagem
     console.log('Message sent: %s', message.messageId);
     console.log('preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}
