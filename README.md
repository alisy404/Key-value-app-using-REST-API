# Key-Value REST API

A simple RESTful API for managing key-value pairs, built using Node.js, Express.js, and MongoDB. This project demonstrates a basic key-value store with CRUD operations, containerized using Docker.

## Project Overview
This repository contains the code for a key-value REST API that allows users to store, retrieve, update, and delete key-value pairs. The API is designed with the following endpoints and behaviors:

### API Specification
- **POST /store**
  - Expected Behavior: Requires request body to contain both `key` and `value`. Returns 400 if not the case, 400 if the key already exists in DB, and 201 if the key does not exist, storing the key and value.
- **GET /store/:key**
  - Expected Behavior: Returns 404 if the key does not exist, and 200 with the key and value if the key exists.
- **PUT /store/:key**
  - Expected Behavior: Requires request body to contain `value`. Returns 400 if not the case, 404 if the key does not exist, and 200 if the key exists, updating the value.
- **DELETE /store/:key**
  - Expected Behavior: Returns 404 if the key does not exist, and 204 if the key exists, deleting the key.
- **GET /health**
  - Expected Behavior: Returns 200 and the text "up".

## Technologies
- **Docker**: For containerizing the application.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: Database for storing key-value pairs.


