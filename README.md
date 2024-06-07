# Sequelize-CRUD-MySQL

A simple CRUD API built with Sequelize and MySQL, featuring user authentication (sign-up and sign-in) and user management functionalities.

## Features
- User Authentication (Sign Up and Sign In)
- CRUD operations for user data
- Password hashing for security
- Token-based authentication (JWT)
- Sequelize ORM for database interaction
- MySQL database

## Technologies Used
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository
    ```sh
    git clone https://github.com/raj-bhanderi/Sequelize-CRUD-MySQL.git
    ```

2. Navigate to the project directory
    ```sh
    cd Sequelize-CRUD-MySQL
    ```

3. Install dependencies
    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add your MySQL database configuration and JWT secret
    ```
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    JWT_SECRET=your-jwt-secret
    ```

5. Run database migrations
    ```sh
    npx sequelize-cli db:migrate
    ```

## Usage

1. Start the server
    ```sh
    npm start
    ```

2. The API will be running at `http://localhost:3000`

## Endpoints

### User Authentication

#### Sign Up
- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
    ```json
    {
        "username": "your-username",
        "password": "your-password",
        "email": "your-email"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User registered successfully!"
    }
    ```

#### Sign In
- **URL:** `/api/auth/signin`
- **Method:** `POST`
- **Description:** Login a user.
- **Request Body:**
    ```json
    {
        "username": "your-username",
        "password": "your-password"
    }
    ```
- **Response:**
    ```json
    {
        "accessToken": "your-jwt-token"
    }
    ```

### User Management

#### Get All Users
- **URL:** `/api/users`
- **Method:** `GET`
- **Description:** Retrieve all users.
- **Response:**
    ```json
    [
        {
            "id": 1,
            "username": "user1",
            "email": "user1@example.com"
        },
        ...
    ]
    ```

#### Get User by ID
- **URL:** `/api/users/:id`
- **Method:** `GET`
- **Description:** Get a user by ID.
- **Response:**
    ```json
    {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com"
    }
    ```

#### Update User by ID
- **URL:** `/api/users/:id`
- **Method:** `PUT`
- **Description:** Update a user by ID.
- **Request Body:**
    ```json
    {
        "username": "new-username",
        "email": "new-email"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User updated successfully!"
    }
    ```

#### Delete User by ID
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Description:** Delete a user by ID.
- **Response:**
    ```json
    {
        "message": "User deleted successfully!"
    }
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
