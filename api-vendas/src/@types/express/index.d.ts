declare namespace Express {
  //vamos exportar para esse namespace Express o tipo que agente quer criar
  export interface Request { //interface que queremos fazer um overwrite acrescentar um tipo doq agente quer acrestar aqui da nossa request
   user: { //objeto user
   id: string; //id do tipo string
   }
  }
}


//d de definição de tipo pasta express pq o request vem dela e vamos configurar o request para atribuir o usario ou agregar, vamos definir mais um tipo pro express
