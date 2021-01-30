# Express Typescript

## Install dependency
`yarn install`

## Postgresql console
`sudo -u postgres psql`

## Remove database 'prisma'
`DROP DATABASE prisma;`

## Create database 'prisma'
`CREATE DATABASE prisma;`

## Migrate database
`yarn prisma migrate dev --preview-feature`

## Run dev server
`yarn dev`

## select database 'prisma'
`\c prisma;`
`\d`
`SELECT * FROM users;`

## update user role on prisma studio
`yarn prisma studio`
