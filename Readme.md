# Bootstrap App

This project is a bootstrap application that includes a Dockerized backend and frontend. The backend is built with Spring Boot and Kotlin, while the frontend is built with React and TypeScript. The application can be started with a single script.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

- `backend/`: Contains the Spring Boot backend application.
- `frontend/`: Contains the React frontend application.
- `docker-compose.yml`: Docker Compose configuration file.
- `Dockerfile`: Dockerfile for building the application images.
- `start.sh`: Script to start the application.

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Build and start the application:**

   ```sh
   ./start.sh
   ```

   This script will build the backend and frontend, create Docker images, and start the services using Docker Compose.

3. **Access the application:**

    - Backend API: `http://localhost:8080`
    - Frontend: `http://localhost`

## Configuration

The application uses the following environment variables:

- `SPRING_PROFILES_ACTIVE`: Active Spring profile (default: `prod`)
- `SPRING_REDIS_HOST`: Redis host (default: `redis`)
- `SPRING_REDIS_PORT`: Redis port (default: `6379`)

## Docker Compose

The `docker-compose.yml` file defines the services for the application:

- `app`: The main application service, which includes both the backend and frontend.
- `redis`: Redis service for caching.

## Dockerfile

The `Dockerfile` is used to build the Docker images for the backend and frontend.
```sh
docker-compose up --build
```