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
  public async recover<T>(key: string): Promise<T | null> {
    //<T> que eles são do mesmo tipo de retorno
    const data = await this.client.get(key)
    //get método do redis pra buscamors informação
    if(!data) {
      return null; //se n tiver nada retorna nulo
    }
    //pega a data os dados que agente recebe que agente faz um json.stringify para recuperar  temos que fazer um json.parse pra pode--lo devolvelo pro padrão original
   const parsedData = JSON.parse(data) as T; //T qual é o tipo da informação generic T

   return parsedData;

  }
    //excluir o método
    public async invalidate(key: string): Promise<void> {
      //await direto pq é void precisa retorna nada
     await this.client.del(key);

    }
  }
