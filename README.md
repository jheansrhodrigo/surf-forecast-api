# Surf Forecast API

## Project structure

- node_modules/
- src/
  - controllers/
    - forecast.ts
  - util/
    - module-alias.ts
  - index.ts
  - server.ts
- test/
  - functional/
    - forecast.test.ts
  - globals.d.ts
  - jest-setup.ts
  - jest.config.js
- .eslintrc
- .gitignore
- .prettierrc
- jest.config.js
- package.json
- tsconfig.json

## Steps settings

- config .gitignore
- init project with: npm init or npm init -y
- install dependency typescript with: yarn add -D typescript
- install dependency types with: yarn add -D @types/node
- install dependency alias with: yarn add module-alias
- install dependency eslint with: yarn add -D @typescript-eslint/eslint-plugin eslint @typescript-eslint/parser
- install dependency ts-node with: yarn add -D ts-node-dev
- install dependency jest with: yarn add -D jest ts-jest @types/jest
- install dependency supertest with: yarn add -D supertest @types/supertest
- install dependency overnight with: yarn add express body-parser @overnightjs/core
- install dependency express with: yarn add -D @types/express
- install dependency prettier with: yarn add -D prettier
