import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';


class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    //instancia do redischace o RedisCache
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');
     //vai lá no redis e tentar recuperar a informação recover que tá armazenada atráves dessa chave ('api-vendas-PRODUCT_LIST'); se não retornar nada aqui é pq tem nd e vai buscar a informação no if abaixo

    if(!products) {//método de busca da de informação atráves do postgres no nosso repositorio
       products = await productsRepository.find();//e vai armazenar esses dados no products
        //se não existe cache depois que ele é buscado agr cria abaixo
        await redisCache.save('api-vendas-PRODUCT_LIST', products)
        //criando o cache acima a chave é a mesma e o valor que é products
    }

    return products;
  }
}

export default ListProductService;
