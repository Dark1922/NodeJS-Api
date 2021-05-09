import multer from 'multer';
import path from 'path'; //biblioteca que vem do node e ela tai pra nos ajuda com difinições de caminhos para encontrar arquivos e armazenar arquivos e assim por diante
import crypto from 'crypto';


const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default  {//vai lidar com upload objeto do multer

  directory: uploadFolder, //diretorio que definimos acima
  storage: multer.diskStorage({

  destination: uploadFolder,

  filename(request, file , callback) {
   const fileHash = crypto.randomBytes(10).toString('hex');

   const filename = `${fileHash}-${file.originalname}`

   callback(null, filename);
  },
  }),
}
