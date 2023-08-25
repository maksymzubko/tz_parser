# RSS-TEST / Maksym Zubko

<p class='container' align="center">
  <a href="https://github.com/s1maxx" target="blank"><img style="border-radius:50%" src="https://avatars.githubusercontent.com/u/56440333?s=400&u=8f30d5a853a52a9d14044d2cf482de4024f9f37c&v=4" width="200" alt="My account" /></a>
</p>

   <p align='center'>
     <a href="https://t.me/maksimzubko" target="_blank"><img src="https://img.shields.io/static/v1?label=Telegram&style=flat&logo=telegram&message=Follow%20me&color=blue"></a>
    </p>


## Requirements
``
Node - v18.13.0
``
``
PostgreSQL - v15
``
``
NPM - v9.2.0
``

## Installation

- Install PostgreSQL 15 (skip if already)
- Install node 18 (skip if already)
- create .env file in project folder and paste your variables (template below)

## .env template
```
DATABASE_NAME=test
DATABASE_USERNAME=YOUR_DATABASE_USERNAME
DATABASE_HOST=YOUR_DATABASE_HOST
DATABASE_PORT=YOUR_DATABASE_PORT
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
JWT_SECRET=YOUR_JWT_SECRET
PORT=YOUR_PORT
```

## Running the app
```bash
# install deps
$ npm install
```
```bash
# fetch migrations and push to DB
$ npm run typeorm migration:run
```
```bash
# development
$ npm run start
```
