# BlogApp - Full Stack Application

BlogApp is a full-stack blog platform that allows users to sign up, sign in, create blog posts, and manage their accounts. The application is built with **Spring Boot** for the backend and **React** for the frontend.

## Features

- **User Authentication**: Register, sign in, and authenticate users.
- **Create, Read, Update, Delete**: Create, read, and manage blog posts.
- **REST API**: Backend exposed as a REST API for frontend integration.

## Tech Stack

- **Frontend**: React, Axios, Ant Design
- **Backend**: Spring Boot, Spring Security, JPA, H2 Database (or your preferred database)
- **Authentication**: JWT-based or session-based
- **Styling**: CSS and SCSS for custom styling
- **Database**: H2 (can be changed to another DB)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Java 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (for backend)
- [Maven](https://maven.apache.org/) (for backend dependency management)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for frontend)
- [Git](https://git-scm.com/) (for version control)
- [PostgreSQL](https://www.postgresql.org/) 

---

### Backend Setup (Spring Boot)

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/blogapp.git
    cd blogapp/backend
    ```

2. **Configure Database**:
   - Open the `src/main/resources/application.properties` file and configure your database credentials if you're using a database like MySQL or PostgreSQL. If you use H2, the default configuration should work.

3. **Build the Backend**:
   - Navigate to the `backend` directory and run:
     ```bash
     mvn clean install
     ```

4. **Run the Backend**:
   - Run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
   - The backend will run on [http://localhost:8080](http://localhost:8080).

5. **Test the Backend**:
   - You can access the API endpoints like `http://localhost:8080/api/auth/register` and `http://localhost:8080/api/auth/login`.

---

### Frontend Setup (React)

1. **Navigate to the Frontend Directory**:
    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**:
   - Run the following command to install all the required dependencies:
     ```bash
     npm install
     ```

3. **Run the Frontend**:
   - To start the frontend application, run:
     ```bash
     npm run dev
     ```
   - The frontend will run on [http://localhost:5173](http://localhost:5173).

4. **Test the Frontend**:
   - You can now access the frontend in your browser. It should be able to make requests to the backend, such as registering and logging in.

---


## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Login with an existing user.

### Blog Posts

- **GET /api/posts** - Retrieve all blog posts.
- **GET /api/posts/{id}** - Retrieve a single blog post by ID.
- **POST /api/posts** - Create a new blog post.
- **PUT /api/posts/{id}** - Update an existing blog post.
- **DELETE /api/posts/{id}** - Delete a blog post.

---
