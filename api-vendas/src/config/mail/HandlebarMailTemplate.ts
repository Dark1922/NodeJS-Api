import handlebars from 'handlebars';

//vamos ter um método parser vai pegar nosso template nossas variaveis vai juntar isso
//e vai poder montar  o email conteudo do email que agt quer enviar pro usuario

interface ItemplateVariable {
  [key: string]: string | number; //string ou number
  //eu vou ter uma interface com propriedades em que a chave vai ser do tipo string e o conteudo pode ser string ou numeros
}
interface IParseMailTemplate {
  template: string;
  variables:ItemplateVariable; //vai ser do tipo da interface acima
}
class handlebarMailTemplate {

  //parse ele vai parsear as variaveis que precisamos enviar pro template pro conteudo dele do email ele vai retornar o html vai parsear vai pegar os conteudo das variables incluindo no html e o retorno disso e um html texto, abaixo o template e as variaveis que precisamos enviar

  public async parse({ template, variables } : IParseMailTemplate): Promise<string> {
    //html em si string promise
   //método de compilação vai compilar a template
    const parseTemplate = handlebars.compile(template)
    //vamos retorna pra ele passando as variables/variaveis
    return parseTemplate(variables);

  }
}
export default handlebarMailTemplate;
