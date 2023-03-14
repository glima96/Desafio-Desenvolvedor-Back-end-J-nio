Sequelize - interface entre js e database
Sequelize CLI - linha de comando para sequelize

Migration - Código Javascript que vai representar o script pra criar/alterar/dropar uma tabela no banco
Model - Classe Javascript que vai representar a tabela do banco

Requisitos pra rodar o projeto

- Banco de dados Postgres instalado
- NodeJS Instalado
- Yarn instalado (npm install -g yarn)

Como rodar o projeto

- src/config/db.js -> alterar credenciais do banco
- yarn
- yarn sequelize db:create
- yarn sequelize db:migrate
- yarn dev

Requisições

- Listagem de respostas
  @GET - http://localhost:3333/form-answer?startDate=14/03/2023&endDate=14/03/2023

- Criação de respostas
  @POST - http://localhost:3333/form-answer

@BODY -
{
"name": "Guilherme Basílio",
"email": "guilherme@gmail.com",
"cpf": "00000000000",
"phone": "34999999999"
}
