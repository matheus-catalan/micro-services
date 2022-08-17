# API-AUTH - UAU-FI

> api-auth tem o intuito de servir como um micro-serviço para criação, validação e controle de acesso aos demais micro-serviços da Uau-fi

## 🔎 Models

- Users
- Modules
- Permissions
- Roles

## 🤗 Requisitos

- [AdonisJS](https://adonisjs.com/)
- [Yarn](https://yarnpkg.com/)
- [Postgres](https://www.postgresql.org/)
- [Sqlite](Pagewww.sqlite.org)
- [Prettier](https://prettier.io/)

## 💻 Instalação

- Clone o projeto em algum diretório:

```sh
 git clone https://tiuaufi@bitbucket.org/tiuaufi/api-auth.git
```

- Dentro da pasta do projeto execute:

```sh
    adonis key:generate
    yarn install
    adonis migration:run
    adonis seed
```

## ✅ Executando o projeto

- Execute:

```sh
    adonis serve --dev
```

## 👮🏽‍♀️ Executando os testes

- Execute:

```sh
    adonis test
```

- ou para executar com coverarge

```sh
    yarn test
```

## ⏳ Insomnia

- Para facilitar, aqui um arquivo com todos os end-points prontos para usar no insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=api-auth&uri=https%3A%2F%2Fbitbucket.org%2Ftiuaufi%2Fapi-auth%2Fsrc%2Fdevelop%2Fapi-auth.json)

## 📖 Documentação

- End-points `https://uaufi.stoplight.io/docs/api-auth/reference/API-AUTH.v1.yaml`
- Modelagem do banco de dados `https://app.sqldbm.com/PostgreSQL/Edit/p125139/#`
