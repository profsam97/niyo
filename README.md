# Task Management System 

This repository provides a RESTFUL API for managing task using **NestJS**. 



## Features

- **Authentication Service:**

  - **User Signup:** users can create new accounts by providing their personal details.
  - **User Signin:** Registered users can sign in to access their accounts.
  - **Password Management:** users can reset and update their passwords securely.

- **User Service:**

  - **Update Profile:** users can update their profile securely.
  - **Delete Profile:** users can delete their profile securely.


- **Task Service:**

  - **Task Creation:** Enables users to create a task.
  - **Task Delete:** Allows users to delete their tasks.
  - **Task Update:** Allows users to update their tasks.
  - **Task Read:** Allows users to view their tasks.


## Other Features

###  Databases

- Made use of  **PostgreSQL** for storing user data.

### CQRS Implementation

I've implemented the **Command Query Responsibility Segregation (CQRS)** pattern in the auth service
This separation of read and write operations enhances scalability and maintainability.

### OAuth2 with JWT

- **OAuth2** is used for authentication and authorization.
- **JSON Web Tokens (JWT)** are issued upon successful authentication, allowing secure communication between services.


### Dockerization

Each service is containerized using **Docker**, ensuring consistent deployment across environments.

### Husky for Development

I've set up **Husky** to streamline development workflows. It enforces code quality checks and runs tests before commits.

### Getting Started

To get started with the Task Management System, follow the instructions provided in the Docs folder files for each service:


### Technologies Used

- Typescript
- Node.js
- Nest.js
- MongoDB (TypeORM)
- PostgreSQL (prisma)
- RabbitMQ (Message Queue)
- JSON Web Tokens (JWT)
- bcrypt.js


## Getting Started
Clone this repository.

there are two ways to run this servic:

1. `Run locally`

install the dependencies:
```bash
npm install
```
Configure environment variables (e.g., database connections)

#### Then start the dev server

```bash
npm run start 
```
## 

2. `Run in a Docker environment`
### build the container using the following
```
docker build -t niyo .
```
### Running it 

```
docker run -dp 3000:3000 niyo
```

### To test the app  visit ip address of the vm/server:3000
