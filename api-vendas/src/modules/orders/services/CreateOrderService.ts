import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string; //ido do produto string
  quantity: number; //quantidade de produto
}
interface IRequest {
  customer_id: string; //client relacioanado a pedidos de compras
  products: IProduct[] //array de produtos interface acima
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);//instancias
    const customerRepository = getCustomRepository(CustomersRepository);
    const productRepository = getCustomRepository(ProductsRepository);

    //temos que garantir que client exista que os produto exista que cada produto tenha quantidade suficiente
    const customerExist = await customerRepository.findById(customer_id);
     //passa o id do client que está no repositorio para customer_id e verificamos abaizo
    if (!customerExist) {//verificar se o cliente não existe
     throw new AppError('Could not find any Customer with the given id.');
    }

    const existsProducts = await productRepository.findAllByIds(products);
    if (!existsProducts.length) {//se tem conteudo nele tamanho se n tem nd vai dar erro
      throw new AppError('Could not find any products with the given ids.')
    }
    //vou retornar os indices que foram retornados dos id de produto
    const existsProductsIds = existsProducts.map(product => product.id);
    //vai pegar as entidades que tem  no existsProducts e damos um apelido na função anonima e retornamos ela só pegando o id do produto
    //eu tenho que comparar com o product que foi enviado pra verificar se realmente foi todos os id certinho

    const checkInexistentProducts = products.filter(
      //array que foi enviada que tem tudo os dados dos produtos , e fazemos um filtro
      product => !existsProductsIds.includes(product.id)
    );//vamos negar o existsProductsIds vamos pegar os produtos que não estiverem aqui existsProductsIds dos que foram enviados vai estár no checkInexistentProducts nessa constante que criamos  vai pegar aquilo q n foi aprovado ou seja n existe em nossa api

    if (checkInexistentProducts.length) {//se tem conteudo nele tamanho se n tem nd vai dar erro
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`)
    }//vai pegar todos produtos inexistente vai retorna a 1 lista da array pegando o id esse id que foi enviado n existe na aplicação basta 1 pra devolver o processo pro usuario

const quantityAvailable = products.filter(
product => existsProducts.filter( p => product.id === product.id )[0].quantity < product.quantity,);

if (quantityAvailable.length) {//se o produto n tem a quantidade n pode vender
   throw new AppError(`The quantity ${quantityAvailable[0].quantity}
    is not available for ${quantityAvailable[0].id}.`)
 }
//garantimos q n vai ser vendido mais doq pode em estoque

}
}

export default CreateOrderService;
