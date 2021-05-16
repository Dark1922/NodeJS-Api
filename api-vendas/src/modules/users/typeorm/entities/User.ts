import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
    }
  from 'typeorm';
  import { Exclude, Expose } from 'class-transformer';
  //tira o atributo pra n aparecer na base de dados qnd cadastrar

  @Entity('users')

  class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude() //falamos que é pra excluir e no controller configuramos o resto
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name: 'avatar_url'})//nome padrão vai expor a url que está sendo montada aqui atráves desse nome 'avatar_url' e se n tiver nada vai ser nulo o campo aceita valor nulo
    getAvatarUrl(): string | null {//esse nome de cima passando pra getAvatarUrl sem underline
      if (!this.avatar) {//ele é um atributo da classe ent pegamos com this classe User
        return null; //se o avatar n existe vai retorna nulo
      }
      //se tiver agente monta essa URL do nosso servidor , o files que é aonde bota a imagem no perfil esse rota serve pra isso , e passa o nome do avatar com os numero do hash
      return `${process.env.APP_API_URL}/files/${this.avatar}`
    }


  }

export default User;
