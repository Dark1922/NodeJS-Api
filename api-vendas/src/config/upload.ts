import multer from 'multer';
import path from 'path'; //biblioteca que vem do node e ela tai pra nos ajuda com difinições de caminhos para encontrar arquivos e armazenar arquivos e assim por diante
import crypto from 'crypto';

//diretorio da rota
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {//vai lidar com upload objeto do multer ta sendo exportado
// Vamos expotar nosso módulo multer, o qual vamos executar passando as nossas configurações em um objeto.
  directory: uploadFolder, //diretorio que definimos acima

  storage: multer.diskStorage({//multer.armazenamento em disco o diskstorage em um disco do servidor que vai ser a pasta de uplaodd

  destination: uploadFolder, //está destinado ao updloadFolder pasta raiz uploads

   //filename vem do multer vai definir de que forma agente vai compor o nome do arquivo
  filename(request, file , callback) {
    //vai gerar a imagem pra n ter o nome igual em randombytes em hexadecimal
    //pra nunca se repetir dificilmente esses numeros ou nome do arquivos
    //cryoto é do próprio node
   const fileHash = crypto.randomBytes(10).toString('hex');
     //10 para gerar os numeros aí podia ser outros numero e vai fazer em string padrão hexadecimal ent tudo isso é pra criar um hash pro fileHash

     //fileHash a 1 parte do nome em numeros e esse file do parametro do filename(request, file callback) usamos o file e o originalname o nome que veio pro servidor e vai ta com exenteção aqui também esse originalname após os numeros de hash
   const filename = `${fileHash}-${file.originalname}`
    //1 valor vem nulo pq n queremos ele e dps declaramos nosso filename
   callback(null, filename);
  },//null caso um erro seja passado pra ele  e o segundo parametro oque ele realmente vai executar que é o nome do arquivo
  }),
}
