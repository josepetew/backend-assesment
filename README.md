# Whoppah Node.js Assignment

This repository contains the code for a Koa-based application developed as a response to the assignment provided in the file [Whoppah-Node.js-Task.pdf](Whoppah-Node.js-Task.pdf) located in the root directory.

## Motivation

The primary purpose of this application is to demonstrate proficiency in developing a GraphQL API using the Koa framework and TypeScript. Additionally, it features integration with a Postgres database via Prisma ORM and uses Redis for caching and pub/sub messaging. All services are containerized using Docker.

## Tech Stack

The application utilizes the following technologies:

1. Koa Framework & TypeScript
2. Apollo for GraphQL API
3. PostgreSQL Database
4. Redis for caching and pub/sub messaging
5. Prisma ORM
6. Docker for containerization

## Potential improvements

- Create unit & integration tests
- Inprove logging and error handling. (E.g. Send more descriptive errors to the client)

## Running the Application Locally

The application can be run in two ways:

1. Running the Node.js server using Nodemon (ideal for development)
2. Running all services via Docker Compose (ideal for testing)

### Pre-requirements

Make sure you have docker installed and running

### Running in Development Mode

First, install all required dependencies:

```bash
npm i
```

Then, make sure that Redis and PostgreSQL are running:

```bash
docker compose up -d
```

Apply any database migrations:

```bash
npm run db:migrate-dev
```

Optional, Seed the database

```bash
npm run db:seed
```

Finally, start the application:

```bash
npm run dev
```

### Running in Docker (Easiest)

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

Optional, Seed the database

```bash
npm run db:seed
```
