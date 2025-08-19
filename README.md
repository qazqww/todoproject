# Todo Project

A full-stack todo application built with React frontend and Spring Boot backend.

## Project Structure

- `todofront/` - React frontend application
- `todoback/` - Spring Boot backend application
- `mysql/` - MySQL database initialization scripts
- `logs/` - Application logs directory

## Prerequisites

- Docker
- Docker Compose

## Quick Start with Docker

### 1. Build and Run

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 2. Access the Application

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8080
- **Nginx Proxy**: http://localhost:8000 (optional)
- **MySQL**: localhost:3306

### 3. Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (database data will be lost)
docker-compose down -v
```

## Docker Services

### Frontend (todofront)

- **Port**: 80
- **Technology**: React + Vite + Nginx
- **Build**: Multi-stage Docker build with Node.js and Nginx

### Backend (todoback)

- **Port**: 8080
- **Technology**: Spring Boot + Java 17
- **Build**: Multi-stage Docker build with Gradle and OpenJDK

### Database (mysql)

- **Port**: 3306
- **Technology**: MySQL 8.0
- **Credentials**:
  - Database: `tododb`
  - Username: `todouser`
  - Password: `todopassword`

### Nginx Proxy (optional)

- **Port**: 8000
- **Purpose**: Reverse proxy for production use

## Environment Variables

The backend uses the following environment variables (set in docker-compose.yml):

- `MYSQL_URL`: MySQL connection string
- `MYSQL_USERNAME`: Database username
- `MYSQL_PASSWORD`: Database password
- `SPRING_PROFILES_ACTIVE`: Spring profile (set to 'docker')

## Development

### Frontend Development

```bash
cd todofront
npm install
npm run dev
```

### Backend Development

```bash
cd todoback
./gradlew bootRun
```

### Database Management

```bash
# Connect to MySQL container
docker exec -it todo-mysql mysql -u todouser -p tododb

# View logs
docker logs todo-mysql
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 8080, and 3306 are available
2. **Build failures**: Check Docker logs with `docker-compose logs`
3. **Database connection**: Wait for MySQL to fully start before backend

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs todoback
docker-compose logs todofront
docker-compose logs mysql
```

### Reset Everything

```bash
# Stop and remove everything
docker-compose down -v --remove-orphans

# Remove all images
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## Production Considerations

- Update nginx configuration for your domain
- Set up SSL certificates
- Configure proper environment variables
- Set up monitoring and logging
- Use external database for production
- Configure proper backup strategies
