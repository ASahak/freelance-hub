## Freelance Hub 

### You can just run this with docker

```bash
  docker-compose up --build
```

## Next.js Frontend

### Installation

```bash
  npm install
```

### Run Development

```bash
  npm run dev
``` 


## NestJS Backend

This repository contains the backend server for the Freelance Hub platform. It is a robust, scalable, and type-safe RESTful API built with NestJS, designed to handle all business logic, data persistence, and user authentication for the freelance marketplace.

### About The Project

This API provides the core functionality for a freelance marketplace application. It manages users (both clients and freelancers), job postings, and the bidding process. The architecture is modular and designed for scalability, with a strong emphasis on type safety from the database to the API endpoints.

```bash
$ npm install
```

## Built With

- NestJS - A progressive Node.js framework for building efficient and scalable server-side applications.
- TypeScript - For adding static types to JavaScript, improving code quality and maintainability.
- Prisma - A next-generation ORM that makes database access easy with auto-completion and type safety.
- PostgreSQL - A powerful, open-source object-relational database system.
- Docker - For containerizing and managing the PostgreSQL database instance.
- Passport.js - For handling authentication, including JWTs and Google OAuth 2.0.
- Swagger (OpenAPI) - For generating interactive API documentation.


## Getting Started
Follow these instructions to get the backend server up and running on your local machine.


### Prerequisites
You must have the following software installed:

- Node.js (v18.x or later recommended)
- Docker and Docker Compose
- A package manager like npm


## Set Up Environment Variables
Create a .env file from the example template.

```bash
  cp .env.example .env
```

### Installation

```bash
  npm install
```


Now, open the newly created .env file and fill in the required variables as described in the Environment Variables section below.


### Build docker container
Make sure Docker Desktop is running.

```bash
  docker-compose up --build
```

The backend server should now be running and accessible at http://localhost:5000.


### Run Database Migrations
This command will sync your Prisma schema with the database, creating all necessary tables.

```bash
  npx prisma migrate dev
```

### Prisma generate schema

```bash
  npx prisma generate
```

### Prisma studio

```bash
  npx prisma studio
```


## API Documentation
This project includes a Swagger UI for easy API exploration and testing. Once the backend server is running, navigate to the following URL in your browser:

http://localhost:5000/api-docs

You will see a complete, interactive documentation of all available API endpoints, models, and DTOs.


## License
This project is distributed under the MIT License. See LICENSE for more information.
