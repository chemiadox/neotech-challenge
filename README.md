## Description

A back-end for a wallet app in Nest.js and TypeScript that will be capable of taking care of
large amounts of requests.

## Prerequisites

- Docker with compose plugin are required to run local instance of Redis and MongoDB services
- Npm to run application on local machine

## Installation

If application will be executed on the host machine, then we need all packages to be installed. In case when the application is executed containerized, there are no additional packages required besides Docker
```bash
# For running on the host machine only
npm i
```

## Running the application

Running containerized version
```bash
docker compose up 
```

Running in the host machine
```bash
docker compose up redis
docker compose up mongodb
npm start
```

## Using the application

- Wallet API is available on the http://localhost:3000
- Details on the available endpoints can be found here http://localhost:3000/api
- There is also a status endpoint for the Wallet Processor here http://localhost:3001/status
- For customer and transaction endpoints `Bearer` authorization is used.

## Roadmap

### Wallet API
- [x] Separate microservices for `wallet-api` and `wallet-processor`
- [x] Transactions are split into chunks with attempt to maximize chunk total value while limiting chunk total latency.
- [x] Chunks are passed to the `wallet-processor`. Chunk with the highest `value` goes first.
- [x] `POST /transaction`, `DELETE /customer/:id`, `PATCH /customer/:id` are protected by the Bearer token
- [x] `GET /customer/:id` returns `name` (*full name*) and `balance`(*amount only*) to requests with Bearer token set, otherwise only `name` is returned
- [x] Swagger API documentation
- [ ] No E2E and unit tests

### Wallet Processor
- [x] It processes a single chunk at once, all transactions are executed sequentially
- [x] Processor tries to decrease user's balance, then stores the transaction
- [x] If balance is not enough to process transaction, transaction is stored with the flag `failed = true` to be processed later
- [x] Scheduler takes care of unsuccessful transactions every hour
- [ ] No E2E and unit tests

### Seeding data
 - [x] On each execution `wallet-api` verifies if the seeding was executed
 - [x] If not, it executes streaming an `S3` object containing customer records. One per line.
 - [x] If the seeding in progress, transaction chunking is stopped. E.g. service accepts requests with transactions, but their execution is postponed until the seeding finished

## Stay in touch

- Author - Siniachevskii Konstantin
