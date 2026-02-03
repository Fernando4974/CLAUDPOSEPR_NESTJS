<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## docker-compose


```
services:
  db:
    image: postgres:14.3
    restart: always
    ports:
      - "6432:5432"
    environment:
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: claud_db_erp
      PGDATA: /var/lib/postgresql/data/pgdata
    container_name: postgres_claudposerp
    volumes:
      - ./postgres:/var/lib/postgresql/data
 
 ```


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# neon connection

npx neonctl@latest init