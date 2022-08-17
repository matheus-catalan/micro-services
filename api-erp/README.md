# API-ERP - UAU-FI

> api-erp tem o intuito de servir como um micro-serviço para gerir as informações de uso interno ou que serão apenas configuradas internamente

## 🔎 Models

- Contract
- Employee
- Employee File
- Erp File
- Office
- Phone
- Type Employee
- Type Work

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

- ou para executar com coverage

```sh
    yarn test
```

## ⏳ Insomnia

- Para facilitar, aqui um arquivo com todos os end-points prontos para usar no insomnia
  [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=API-ERP&uri=https%3A%2F%2Fbitbucket.org%2Ftiuaufi%2Fapi-erp%2Fraw%2F1701f672af11c3f5e1ac01cf718ebee2d175f207%2Fapi-erp.json)

## 📖 Documentação

- End-points `https://uaufi.stoplight.io/docs/api-erp/reference/api-erp.v1.yaml`
- Modelagem do banco de dados `https://app.sqldbm.com/PostgreSQL/Edit/p125139/#`
