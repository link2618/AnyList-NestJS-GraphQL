<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Dev

1. Copiar el ```env.templete``` y renombrar a ```.env```.
2. Ejecutar
```
npm i
```
3. Levantar imagen de la BD
```
docker compose up -d
```
4. Levantar proyecto
```
npm run start:dev
```
5. Visitar
```
localhost:{{port}}/graphql
localhost:4000/graphql
```