# BlogApp - Spring Boot Blog Application

## Overview
This is a simple **Spring Boot** application that provides a REST API for managing blog posts. It utilizes **Spring Data JPA** for database interaction and **PostgreSQL** as the database. The project is designed to allow users to create, read, update, and delete blog posts, with a basic structure for authentication.


## Prerequisites
Before setting up the application, make sure you have the following tools installed on your local machine:

Java 17 or above: Make sure Java is installed and the JAVA_HOME environment variable is set.
Maven: Ensure Maven is installed to build the project.
PostgreSQL: Install PostgreSQL and create a database for the application.
IDE:I'm using VSCode, IntelliJ IDEA, or Eclipse for editing the project.

## Project Structure

The project follows a modular approach where different responsibilities are separated into appropriate packages and folders. Here's a breakdown of the directory structure:

### `src/main/java/com/blog/blogapp/`
The main application folder that contains the core logic of the project.

- **`config/`**:  
  This folder contains configuration files for your application. It's where any application-wide settings, such as security configurations, will be defined.  
  *Example file: `SecurityConfig.java`*.

- **`controller/`**:  
  Contains classes that handle HTTP requests. These classes are annotated with `@RestController` to expose the RESTful endpoints of the application.  
  *Example file: `PostController.java`*.

- **`model/`**:  
  The model package contains the Java classes that represent the entities in the database. These are typically annotated with `@Entity` to be mapped to database tables.  
  *Example files: `Post.java`, `User.java`*.

- **`repository/`**:  
  This package contains interfaces that extend `JpaRepository` or `CrudRepository`. These interfaces provide methods for database interaction, such as saving, deleting, or retrieving data.  
  *Example files: `PostRepository.java`, `UserRepository.java`*.

- **`security/`**:  
  Contains classes related to application security (if required). This includes user authentication, authorization, and configuration of security filters.  
  *Example file: `SecurityConfig.java`*.

- **`service/`**:  
  Business logic is implemented in this package. Services typically use the repositories to perform CRUD operations and can contain more complex business logic.  
  *Example file: `PostService.java`*.

- **`BlogappApplication.java`**:  
  This is the entry point of the Spring Boot application. It contains the `main` method that runs the application.

### `src/main/resources/`
Contains configuration files that are used by the Spring Boot application.

- **`application.properties`**:  
  This is the main configuration file for your Spring Boot application. You can configure your database connection, server settings, logging level, etc.  
  *Example configuration for PostgreSQL database:*
  ```properties
  spring.datasource.url=jdbc:postgresql://localhost:5432/blogapp
  spring.datasource.username=your-username
  spring.datasource.password=your-password
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true



