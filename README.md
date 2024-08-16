# Category Management System

A full-stack web application for managing categories, built with Angular, Node.js, Fastify, MySQL, and Prisma ORM.

## Features

- Create, Read, Update, and Delete (CRUD) operations for categories
- Angular-based frontend with responsive UI
- RESTful API backend using Node.js and Fastify
- MySQL database for persistent storage
- Prisma ORM for type-safe database operations

## Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js, Fastify
- **Database**: MySQL
- **ORM**: Prisma

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- MySQL (v5.7 or later)
- Angular CLI

## Installation

1. Clone the repository:

2. Install dependencies:

3. Set up the database:

- Create a MySQL database
- Copy `.env.example` to `.env` in the backend directory
- Update the `.env` file with your database credentials

4. Run database migrations:

## Running the Application

1. Start the backend server:

2. In a new terminal, start the Angular frontend:

3. Open your browser and navigate to `http://localhost:4200`

## API Endpoints

- `GET /category`: Fetch all categories
- `POST /category`: Create a new category
- `PUT /category/:id`: Update a category
- `DELETE /category/:id`: Delete a category

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
