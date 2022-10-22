# Nonrelational Databases Project
## Description
This project is a simple implementation of a nonrelational database.
It presents CTF challenges database and provides a simple interface to query it. It is a simple key-value store that supports the following operations:

## Prequisites
- neo4j browser
- Node.js

Optional:
- yarn

## Development
1. Open neo4j and create a *Local DBMS* with the default settings, username: `neo4j` and password: `.`.
2. Open newly created database in *neo4j browser* and create the database `ctf` with command: `CREATE DATABASE ctf` and hit `CTRL+Enter`.
3. Clone this repository and run `npm install` or `yarn` to install the dependencies.
4. Run `npm run start` or `yarn start` to start the server. If everything is ok, you should see the following:
    ```
    Creating the database...
    Clearing the database...
    Database cleared!
    Adding categories...
    Categories added!
    Adding teams...
    Teams added!
    Adding CTFs...
    CTFs added!
    Main init is done!
    ```
 5. To see the database run in *neo4j browser* the following command: `:use ctf` and then `MATCH (n) RETURN n`.
