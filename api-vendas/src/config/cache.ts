import { RedisOptions } from 'ioredis';
//uma interface que contem as configurações do redis que é a que agente fez abaixo

interface ICacheConfig {
  config: {
    redis: RedisOptions; //ele é essa interface com os dados que importamos
  },
  driver: string;
}

//configurações padrões do redis
export default {
    config: {
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS || undefined,
      }
    },
    driver:'redis', //drive é o redis
} as ICacheConfig; //dessa forma conseguimos definer a tipagem pra essa configuração
