import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string
}

@EntityRepository(Product)
 class ProductsRepository extends  Repository<Product>{

  public async findByName( name: string ): Promise<Product | undefined> {

    const product = await this.findOne({

      where: {
      name,
      },
    });
  return product
  }
  // IFindProducts[] um array que vai receber o id de todos produtos massa dentro da array
  //e vai retornar uma array de produtos já que é pra retornar uma array dos id deles
  public async findAllByIds(  products: IFindProducts[]): Promise<Product[]> {
     //vamos fazer um map aonde eu pego cada um deles e pego somente o id
    const productIds = products.map(products => products.id);
    //ent ta armazenando na constante productIds os id de cada produto existente
    const existsProducts = await this.find({
      where: {
        id: In(productIds) //ele vai pegar e pesquisar um id dentro de uma lista a lista que monstamos acima productIds
      },
    });
  return existsProducts;

  }
}
export default ProductsRepository;
