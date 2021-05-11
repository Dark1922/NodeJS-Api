import handlebars from 'handlebars';
import fs from 'fs'; //vamo ler o arquivo file com essa biblioteca file system

interface ItemplateVariable {
  [key: string]: string | number; //string ou number
  //eu vou ter uma interface com propriedades em que a chave vai ser do tipo string e o conteudo pode ser string ou numeros
}
interface IParseMailTemplate {
  file: string; //vamos receber um arquivo aqui
  variables: ItemplateVariable; //vai ser do tipo da interface acima
}
class handlebarMailTemplate {

  public async parse({ file, variables } : IParseMailTemplate): Promise<string> {
    //aguarda que todo conteudo desse arquivo seja lido await pq pode demorar um tempo para carregar a página de recuperação de senha
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' });
    const parseTemplate = handlebars.compile(templateFileContent)
    //vvai fazer o parse do templateFileContent
    return parseTemplate(variables);

  }
}
export default handlebarMailTemplate;
