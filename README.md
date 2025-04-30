 # 🚀 NestJS Server Setup

Цей сторений з NestJS і включає в себе Prisma, GraphQL. Та реалізовує REST API і функції роботи з файлами та JWT авторизацію.

## Рекомендоване налаштування IDE

Для детальної інформації з конфігурації NestJS можна ознайомитися з NestJS Documentation

## Налаштування проєкту

Клонуй проєкт

```sh
git clone https://github.com/lil-sunny/test_dzen
```
```sh
cd test_dzen
```

## Встановлення залежностей

```sh
npm install
```

## Редагування налаштувань .env

замініть  на власні значеня 

```sh
DATABASE_URL=mysql://DB_LOGIN:DB_PASSWORD@DB_HOST/DB_NAME?schema=public
PORT=5050
JWT_SECRET=SeCreT
```

## Генерування таблиць в БД з Prisma

Щоб згенерувати архітектуру таблиці, то можна виконати наступні команди
```sh
npx prisma generate
```
```sh
npx prisma migrate dev --name init
```

## Запустіть проєкт

```sh
npm run start:dev
```
