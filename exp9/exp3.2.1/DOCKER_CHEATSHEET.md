# 🚀 Docker Commands Quick Reference

## Build & Run

| Command | Purpose |
|---------|---------|
| `docker build -t react-docker-app .` | Build image from Dockerfile |
| `docker build -t react-docker-app:1.0.0 .` | Build with specific tag |
| `docker run -d -p 8080:8080 react-docker-app` | Run container detached |
| `docker-compose up --build` | Build and run with Docker Compose |
| `docker-compose up -d` | Run in background |

## Container Management

| Command | Purpose |
|---------|---------|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker start <container>` | Start container |
| `docker stop <container>` | Stop container |
| `docker restart <container>` | Restart container |
| `docker rm <container>` | Remove container |
| `docker logs <container>` | Show logs |
| `docker logs -f <container>` | Follow logs |

## Image Management

| Command | Purpose |
|---------|---------|
| `docker images` | List images |
| `docker images \| grep react` | Filter images |
| `docker rmi <image>` | Remove image |
| `docker inspect <image>` | Show image details |
| `docker history <image>` | Show image layers |

## Debugging

| Command | Purpose |
|---------|---------|
| `docker exec -it <container> sh` | Access container shell |
| `docker exec <container> ls /usr/share/nginx/html` | Run command in container |
| `docker inspect <container>` | Show container configuration |
| `docker stats` | Show real-time resource usage |
| `docker cp <container>:/file /host/path` | Copy file from container |

## Testing

| Command | Purpose |
|---------|---------|
| `curl http://localhost:8080` | Test application |
| `curl -I http://localhost:8080/` | Get response headers |
| `curl -H "Accept-Encoding: gzip" http://localhost:8080/` | Test gzip |
| `wget http://localhost:8080` | Download with wget |

## Docker Compose

| Command | Purpose |
|---------|---------|
| `docker-compose up` | Start services |
| `docker-compose down` | Stop services |
| `docker-compose logs` | Show logs |
| `docker-compose ps` | List services |
| `docker-compose build` | Build services |
| `docker-compose exec <service> sh` | Access service shell |

## System

| Command | Purpose |
|---------|---------|
| `docker version` | Show Docker version |
| `docker info` | Show Docker info |
| `docker system df` | Show disk usage |
| `docker system prune` | Remove unused resources |
| `docker system prune -a` | Aggressive cleanup |

---

# 📊 Useful Command Combinations

## Build and Run Fresh

```bash
# Linux/macOS
docker build -t react-docker-app:latest . && \
docker run -d -p 8080:8080 --name react-docker-app react-docker-app:latest

# Windows (PowerShell)
docker build -t react-docker-app:latest . ; `
docker run -d -p 8080:8080 --name react-docker-app react-docker-app:latest
```

## Stop and Clean Up

```bash
docker stop react-docker-app && docker rm react-docker-app && docker rmi react-docker-app:latest
```

## View Real-time Metrics

```bash
docker stats react-docker-app --no-stream
```

## Get Container IP

```bash
docker inspect react-docker-app | grep '"IPAddress"'
```

## Export Image

```bash
docker save react-docker-app:latest -o react-docker-app.tar
```

## Load Image

```bash
docker load -i react-docker-app.tar
```

---

# 📝 Environment Variables

## Set via docker run

```bash
docker run -e NODE_ENV=production \
           -e REACT_APP_API_URL=http://api.example.com \
           -p 8080:8080 \
           react-docker-app
```

## Set via docker-compose.yml

```yaml
environment:
  - NODE_ENV=production
  - REACT_APP_API_URL=http://api.example.com
```

## View Container Environment

```bash
docker exec <container> env
```

---

# 🔍 Common Troubleshooting Commands

## Check if port is in use

```bash
# Windows
netstat -ano | findstr :8080

# Linux/macOS
lsof -i :8080
```

## Kill process on port

```bash
# Windows
taskkill /PID <PID> /F

# Linux/macOS
kill -9 <PID>
```

## View container network

```bash
docker inspect <container> | grep -A 20 '"Networks"'
```

## Check health

```bash
docker inspect <container> --format='{{.State.Health.Status}}'
```

## View disk usage by images

```bash
docker images --format "table {{.Repository}}\t{{.Size}}"
```

---

# 💡 Performance Tips

## Build with no cache

```bash
docker build --no-cache -t react-docker-app .
```

## Reduce image size

```bash
# Use Alpine base images
# Minimize layers
# Use .dockerignore properly
# Multi-stage builds
```

## Speed up builds

```bash
# Docker builds next level from cache
# Order Dockerfile from least to most changed
# Place static files later
```

## Monitor resource usage

```bash
docker stats --no-stream --all
```

---

# 🛡️ Security Commands

## View image security details

```bash
docker inspect <image> | grep -E "User|Volumes"
```

## Run with read-only filesystem

```bash
docker run --read-only -p 8080:8080 react-docker-app
```

## Check for vulnerabilities (requires Docker Scout)

```bash
docker scout cves react-docker-app:latest
```

---

# 📚 Get Help

```bash
docker --help              # Docker help
docker build --help        # Build help
docker run --help          # Run help
docker-compose --help      # Docker Compose help
```

---

**Last Updated**: April 21, 2026
**Quick Reference**: v1.0.0
