# Ecommerce Api project

Eberto Polo Zambrano [`GITHUB`](https://github.com/ebertopz3).

## Indications for Project

To initialize the project consider the following

## Node version

`20.13.1`

### Run the following commands to start the project

Being in the project directory, install dependencies with

```bash
npm ci
```

(or `pnpm install` or `yarn`)

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

# Considerations

Project structured in layers, where the routes, controllers, services, database and interfaces are located.

## Routing version

Version is used in the path, to be able to improve the logic or add data in new versions, maintaining stability in all
versions of the API

## Database

To create the database in postgresql, run the queries on the db.sql file in the database folder

## Register User

Register a user to start, use register/user in the documentation for password encryption

## ENV

Configure the .env file at the root of the project with the variables

> PORT=5000

> KEY_TOKEN=XXXXXXXXXXXXXXXXX

## endpoint documentation with swagger

Enter the link to test the endpoints

API documentation: [`SWAGGER`](http://localhost:5000/api-docs/).

***






