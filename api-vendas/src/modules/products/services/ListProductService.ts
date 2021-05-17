import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    //instancia do redischace
    const redisCache = new RedisCache();

    const products = productsRepository.find();

    await redisCache.save('test', 'teste')//chave e valor como teste

    return products;
  }
}

export default ListProductService;
