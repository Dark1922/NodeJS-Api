import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
    }
  from 'typeorm'


  @Entity('user_tokens')

  class UserToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    @Generated('uuid')
    token: string; //coluna e que é um valor gerado automaticamente uuid

    @Column()
    user_id: string;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

  }

export default  UserToken;
