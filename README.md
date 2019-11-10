# Alchemy
[![Travis (.org)](https://img.shields.io/travis/AlchemyGame/alchemy.svg)](https://travis-ci.org/AlchemyGame/alchemy)
[![dep](https://img.shields.io/david/AlchemyGame/alchemy.svg?style=flat)](https://david-dm.org/AlchemyGame/alchemy)
[![devDep](https://img.shields.io/david/dev/AlchemyGame/alchemy.svg?label=devDependencies)](https://david-dm.org/AlchemyGame/alchemy?type=dev)

## Usage
1. Install [Git command line client](https://git-scm.com/downloads).
1. Install [Node.js](https://nodejs.org/).
1. [Fork](https://github.com/AlchemyGame/alchemy/fork) this repository into your account.
1. Clone forked repository.
1. Install all dependencies `npm install`.
1. Install [mongoDB](https://www.mongodb.com/download-center/community).
1. Start database `mongod`.
1. Start server `node server.js`.
1. Open http://localhost:7540 to view the frontend.

## Available tasks
_You can use `yarn` instead of `npm run`_
* `npm run database`: start database
* `npm run start`: start server
* `npm run server`: start server with nodemon (automatically restarts server on code change)
* `npm run test`: run tests
* `npm run dump`: export Alchemy collections
* `npm run drop`: clear Alchemy database
* `npm run restore`: import Alchemy collections

## Development
Please make sure to follow our [Commit Message Format specification](https://github.com/AlchemyGame/alchemy/wiki/Commit-Message-Format)
