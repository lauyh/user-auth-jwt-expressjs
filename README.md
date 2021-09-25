# JWT Authentication

This repo is aimed to provide an authentication mechanism with JWT token.
In order to make the JWT token more secure,, the jwt token will be signed with rsa 256 algorithm.
The public key and private key is using [PKCS](https://en.wikipedia.org/wiki/PKCS) 1.

The authserver serve as a authentication server, while the server is serve as a client server(act as backend for frontend applications).
The reason of splitting the server and auth server is to ease the scalability of the application.

# Installation Instructions
This application require [Node JS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/).
The reason of using Yarn package manager instead of npm package manager is because it's performace and security.

After install the Node JS runtime and Yarn package manager, open `command prompt` for Window user or `Terminal` for Mac OS or Linux user.
Then `cd` to the repo and run the following command.

Start the authServer
```bash
cd authServer
yarn install
yarn start 
```

Start the client server

```bash
cd server
yarn install
yarn start 
```