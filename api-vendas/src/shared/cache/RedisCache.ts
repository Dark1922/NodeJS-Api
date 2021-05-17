import Redis, {Redis as RedisClient} from 'ioredis';
import cacheConfig from '@config/cache';

export default class  RedisCache {
  private client : RedisClient; //atráves desse client vamos estar manipulando

  constructor() {//chamando a configuração e instanciando no Redis
    this.client = new Redis(cacheConfig.config.redis) //da pasta config cache
  }
  public async save(key: string, value: any): Promise<void> {
   //vamos pegar nossa instancia que estáno client
    await this.client.set(key, JSON.stringify(value));//transforma numa string


  }

  //recover é recuperar um dado ai passa a chave que é string
  //public async recover<T>(key: string): Promise<T | undefined> {
    //<T> que eles são do mesmo tipo

    //excluir o método
    public async invalidate(key: string): Promise<void> {

    }
  }
