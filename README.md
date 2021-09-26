# JWT Authentication
## Notes
This repo is aimed to provide an authentication mechanism with JWT token.
In order to make the JWT token more secure,, the jwt token will be signed with rsa 256 algorithm.
The public key and private key is using [PKCS](https://en.wikipedia.org/wiki/PKCS) 1.

The authserver serve as a authentication server, while the server is serve as a client server(act as backend for frontend applications).
The reason of splitting the server and auth server is to ease the scalability of the application.
The reasoning behind using JWT token instead of generating a random bearer token is because, this auth server is for in-house use.
Therefore, the information that attached in the JWT token ease the communication of the application about the user.

The code in the `server` is an example of an in-house web api(e-commerce).

This application is a POC application, which is not ready for production. Do use this repo with cautious.


# Features
## Tech Stack
1. Node JS
2. Sequelize 
3. MySQL

# Usage
## Requirement
1. Node JS
2. MySQL Database or other SQL Database Server(need to add the driver and update dialect accordingly)
3. Redis (to store refresh token)

## Setup
This application require [Node JS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/).
For database wise, this application is using [MY SQl](https://www.mysql.com/).
If you plan to use other database, do install the corresponding driver and update the database type in `/lib/sequelize.js`.
Do update the database information in the `.env` file by copying the `.env.example` and rename as `.env`.
The reason of using Yarn package manager instead of npm package manager is because it's performance and security.
But you are still able to use `npm` by deleting the `yarn.lock` file and run `npm install`. 

Do update the variable in `.env` file.

```
DB_USR=<YOUR_DATABASE_USERNAME>
DB_PASSWORD=<YOUR_DATABASE_PASSWORD>
DB_NAME=<YOUR_DATGABASE_NAME>
PORT=<YOUR_PORT>
```

After install the Node JS runtime and Yarn package manager, open `command prompt` for Window user or `Terminal` for Mac OS or Linux user.
Then `cd` to the repo and run the following command.

Start the authServer

```bash
cd authServer
yarn seed
yarn genKeyPair
yarn install
yarn start 
```

Start the client server

```bash
cd server
yarn install
yarn start 
```

# Licence 

The MIT License

Copyright (c) 2021

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.