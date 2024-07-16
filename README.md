# iRango Cook API
![typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Node 20.10](https://shields.io/badge/Node-20.10.0-339933?logo=Node.js&logoColor=FFF&style=flat-square)
![nestjs](https://shields.io/badge/NestJS-E0234E?logo=NestJS&logoColor=FFF&style=flat-square)
![mongodb](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=FFF&style=flat-square)
![docker](https://shields.io/badge/Docker-2496ED?logo=Docker&logoColor=FFF&style=flat-square)
![swagger](https://shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=FFF&style=flat-square)
![make](https://shields.io/badge/Make-00CC00?logo=Make&logoColor=FFF&style=flat-square)
![jest](https://shields.io/badge/Jest-C21325?logo=Jest&logoColor=FFF&style=flat-square)
![eslint](https://shields.io/badge/ESLint-4B32C3?logo=ESLint&logoColor=FFF&style=flat-square)
![editorconfig](https://shields.io/badge/EditorConfig-000000?logo=EditorConfig&logoColor=FFF&style=flat-square)

This project is a part of a fast food self-service system, proposed as a Tech Challenge for the Software Architecture Postgraduate Course at FIAP.

For this project, we utilized the [TypeScript](https://www.typescriptlang.org/) programming language with [Node.js](https://nodejs.org/) and the [Nest.js](https://nestjs.com/) framework. For the database management, we use a [MongoDB 7.0](https://www.mongodb.com/) to handle information related to Cooking process.

To build the API documentation, we've used [Swagger](https://swagger.io/) tool integrated with Nest.js, accessible through the endpoint: {irango_cook_host}/docs.

## Workspace Dependencies
- [Node 20.10](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started/)
- Make
  - [Windows](https://gnuwin32.sourceforge.net/packages/make.htm)
  - Linux
  ```bash
  sudo apt update
  sudo apt install make
  ```

## Project Dependencies
* Install project dependencies with:
```bash
npm run install
```

* Create a MongoDB database or start [fiap-irango-database/docker-compose.yml](https://github.com/FIAP-Tech-Challenge-53/fiap-irango-database/blob/main/docker-compose.yml) file.

* Start [fiap-irango-order-api](https://github.com/FIAP-Tech-Challenge-53/fiap-irango-order-api) service. It can be run after fiap-irango-cook-api starts.
 
## Start Project using Docker
Configure all docker containers and volumes and start the application
```bash
make setup

# or try without make

cp .env.example .env
docker compose build --progress=plain
docker compose up
```

## Start project using npm
Watch mode:
```bash
npm run start:dev
```

Compiled mode:
```bash
npm run build
npm run start
```

## Endpoints
We developed few endpoints which can be found in [pedidos.controller](./src/infra/web/nestjs/pedidos/pedidos.controller.ts) file

## Business Requirements:
1. Registrar novo pedido
> POST {irango_cook_host}/v1/pedidos/register
2. Listar pedidos em aberto
> GET {irango_cook_host}/v1/pedidos
3. Buscar um pedido por ID
> POST {irango_cook_host}/v1/pedidos/id
4. Informar o início do preparo de um pedido
> POST {irango_cook_host}/v1/pedidos/:id/start
5. Informar o término do preparo de um pedido
> POST {irango_cook_host}/v1/pedidos/:id/finish

## Automated Tests
### Unit Tests
```bash
npm run test:unit
```

### Test Coverage
```bash
npm run test:coverage
```

<img src="./docs/test_suite.png" alt="Test Suite Coverage" width="900" />


## Make commands
### Using Docker
- Setup Project: `make setup`. This command will create docker network, containers and volumes. It will also start the project and show its logs.
- Start Project: `make up`
- Stop Projects: `make down`
- Show logs: `make logs`
- Access container bash: `make bash`
