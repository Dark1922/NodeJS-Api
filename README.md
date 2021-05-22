
<p align="center">
  <h3 align="center">🚀 # Api-sales NodeJS</h3>

  <p align="center">
    A simple and ready-to-use Register Products, Users, Authentication, Cryptojs, JWT, Password recovery, Business Rules, Avatar Upload, update, Redis and Cache
   
  </p>
</p>

<hr />

### 🔖 Using: technology
<dl>
  <dt><strong>TypeORM</strong></dt>
  <dd>We need a good ORM to deal with persistence stuff</dd>
  
  <dt><strong>Clean Architecture</strong></dt>
  <dd>Using a modular DDD approach with Clean Architecture</dd>
  
  <dt><strong>Celebrate and JOI</strong></dt>
  <dd>Libs for validatint inputs from clients</dd>
  
  <dt><strong>Express</strong></dt>
  <dd>The API framework</dd>
  
  <dt><strong>Bcryptjs</strong></dt>
  <dd>Lib to deal with criptography stuff</dd>

  <dt><strong>jsonwebtoken</strong></dt>
  <dd>Lib to deal with JWT tokens</dd>

  <dt><strong>Jest</strong></dt>
  <dd>Using jest for the unity tests</dd>
  
  <dt><strong>Tsyringe</strong></dt>
  <dd>Dependency Injection library</dd>
  
  <dt><strong>Supertest</strong></dt>
  <dd>Using supertest for integrations tests</dd>
  
  <dt><strong>Typescript</strong></dt>
  <dd>For typing the JS</dd>
  
  <dt><strong>Eslint</strong> and <strong>Prettier</strong></dt>
  <dd>Used to guarantee code standards</dd>
</dl>

<hr />


### Running in Dev Enviroment / Scripts
First of all, you will need to install the dependencies:<br />
`npm install`

Running the app:<br />
`npm run dev`

Running the tests:<br />
`npm run test`

Running the tests on watch mode:<br />
`npm run test:watch`

Running the integration tests:<br />
`npm run test:integration`

Running the Postgres in a container:<br />
`docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`


<hr />

### Migrations

Running a TypeORM migrations:<br />
`npm run typeorm migration:run`

Reverting a TypeORM migrations:<br />
`npm run typeorm migration:revert`

Creating a TypeORM migration:<br />
`npm run typeorm -- migration:create --name CreateUsers --dir ./src/modules/identity/infra/data/typeorm/migrations`








