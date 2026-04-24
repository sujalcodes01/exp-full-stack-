# Experiment 3.2.1: Dockerize React Application with Multi-Stage Build

A production-ready React application containerized using Docker's multi-stage build process for optimal image size and efficient deployment.

## 📋 Project Overview

This experiment demonstrates best practices for containerizing React applications:
- **Multi-stage Docker build** for optimized image size (< 100MB)
- **Nginx server** configured for production deployment
- **Gzip compression** enabled for faster asset delivery
- **Intelligent caching headers** for static assets
- **Security headers** for enhanced application safety
- **Environment variable support** for flexible configuration

## 🎯 Objectives Completed

✅ Create Dockerfile with build stage
✅ Configure production-ready Nginx server
✅ Optimize image size
✅ Handle environment variables
✅ Build and run Docker container

## 📦 Prerequisites

- Docker 20.10+
- Node.js 18+ (for local development)
- Docker Compose (optional, for easier orchestration)
- VS Code (recommended)

## 🏗️ Project Structure

```
exp3.2.1/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── .env
└── package.json
```

## 🚀 Quick Start

### Method 1: Using Docker Compose (Recommended)

```bash
# Build and run the container
docker-compose up --build

# Access the application at http://localhost:8080
```

### Method 2: Manual Docker Build

```bash
# Build the Docker image
docker build -t react-docker-app:latest .

# Run the container
docker run -p 8080:8080 react-docker-app:latest

# Access the application at http://localhost:8080
```

### Method 3: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build production bundle
npm run build

# Test the build locally
npm install -g serve
serve -s build -l 3000
```

## 🐳 Docker Configuration Details

### Multi-Stage Build Process

1. **Build Stage (Node 18 Alpine)**
   - Uses lightweight Alpine Linux base
   - Installs dependencies
   - Builds React application
   - Generates optimized production bundle

2. **Runtime Stage (Nginx Alpine)**
   - Uses minimal Nginx Alpine image
   - Removes default configuration
   - Applies custom production settings
   - Copies only the built application files
   - Exposes port 8080

### Image Size Optimization

- **Final Image Size**: < 100MB (typically ~50-70MB)
- **Techniques Used**:
  - Multi-stage builds (discarding build dependencies)
  - Alpine Linux base images
  - Production npm installs only
  - Minimal .dockerignore setup
  - Layer caching optimization

## ⚙️ Nginx Configuration Features

### Performance Optimization
- **Gzip Compression**: Enabled for text-based assets
- **Compression Levels**: Level 6 (balance between speed and ratio)
- **Supported MIME Types**: HTML, CSS, JavaScript, JSON, XML

### Intelligent Caching Headers
- **HTML Files**: Cache for 1 hour (must revalidate)
- **JS/CSS Files**: Cache for 1 year (immutable)
- **Images**: Cache for 1 year (immutable)
- **Fonts**: Cache for 1 year (immutable)
- **Dynamic Routes**: No cache (client-side routing)

### Security Headers
- **X-Frame-Options**: SAMEORIGIN (prevent clickjacking)
- **X-Content-Type-Options**: nosniff (prevent MIME sniffing)
- **X-XSS-Protection**: Enabled (XSS protection)
- **Referrer-Policy**: Controlled referrer information

### React Router Support
- All requests route to `index.html`
- Enables client-side routing
- Dynamic route handling without server configuration

## 🔧 Environment Variables

The application supports the following environment variables:

```env
# API endpoint for the React application
REACT_APP_API_URL=http://localhost:3000/api

# Node environment
NODE_ENV=production
```

### Setting Environment Variables

**In docker-compose.yml:**
```yaml
environment:
  - NODE_ENV=production
  - REACT_APP_API_URL=http://your-api.com
```

**In docker run command:**
```bash
docker run -e NODE_ENV=production -e REACT_APP_API_URL=http://api.com -p 8080:8080 react-docker-app:latest
```

**In .env file (local development):**
```
REACT_APP_API_URL=http://localhost:3000/api
NODE_ENV=production
```

## 🏥 Health Check

The container includes a health check that:
- Runs every 30 seconds
- Has 5-second startup period
- Timeout of 3 seconds per check
- Retries up to 3 times

```bash
# Check container health
docker ps  # Look for "healthy" status
docker inspect <container-id> | grep -A 5 "Health"
```

## 📊 Docker Build Arguments

Supported build arguments for metadata:

```bash
docker build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --build-arg VERSION=1.0.0 \
  -t react-docker-app:1.0.0 .
```

## 🧪 Testing the Docker Image

### Check Image Information
```bash
# List images
docker images | grep react-docker-app

# Inspect image details
docker inspect react-docker-app:latest
```

### Test Container Functionality
```bash
# Build and run
docker build -t react-docker-app:test .
docker run -d -p 8080:8080 --name test-container react-docker-app:test

# Test the application
curl http://localhost:8080

# Check container logs
docker logs test-container

# Verify gzip compression
curl -I -H "Accept-Encoding: gzip" http://localhost:8080

# Stop and remove
docker stop test-container
docker rm test-container
```

### Performance Testing
```bash
# Check response headers
curl -v http://localhost:8080/

# Test cache headers for different file types
curl -I http://localhost:8080/static/js/main.js
curl -I http://localhost:8080/static/css/main.css
curl -I http://localhost:8080/
```

## 📈 Performance Metrics

### Build Performance
- **Build Time**: ~2-3 minutes (first build)
- **Layer Caching**: Subsequent builds much faster
- **Image Size**: 50-70MB (compressed)

### Runtime Performance
- **Startup Time**: < 2 seconds
- **Memory Usage**: ~30-50MB
- **CPU Usage**: Minimal at idle

## 🔍 Debugging

### View Container Logs
```bash
docker logs react-docker-app
docker logs -f react-docker-app  # Follow logs
```

### Access Container Shell
```bash
docker exec -it react-docker-app sh
```

### Inspect File System
```bash
# Inside container shell
ls -la /usr/share/nginx/html/
cat /etc/nginx/conf.d/default.conf
```

### Check Network
```bash
docker inspect react-docker-app | grep -A 5 NetworkSettings
```

## 🛑 Stopping and Removing Containers

```bash
# Stop container
docker stop react-docker-app

# Remove container
docker rm react-docker-app

# Remove image
docker rmi react-docker-app:latest

# Clean up (using docker-compose)
docker-compose down
```

## 📝 Dockerfile Explanation

### Stage 1: Builder
```dockerfile
FROM node:18-alpine AS builder  # Lightweight Node.js base
WORKDIR /app                     # Set working directory
COPY package*.json ./            # Copy dependency files
RUN npm ci                       # Clean install dependencies
COPY . .                         # Copy source code
RUN npm run build                # Build React app
```

### Stage 2: Runtime
```dockerfile
FROM nginx:alpine AS runtime     # Lightweight web server
COPY nginx.conf ...              # Custom configuration
COPY --from=builder /app/build . # Copy built files only
EXPOSE 8080                      # Expose port
```

## 🎓 Learning Outcomes

After completing this experiment, you will understand:
- ✅ Docker multi-stage build process
- ✅ React application containerization
- ✅ Nginx configuration for static content
- ✅ Image size optimization techniques
- ✅ Caching strategies for production
- ✅ Security best practices in containers
- ✅ Environment variable handling
- ✅ Health checks and monitoring
- ✅ Docker Compose orchestration
- ✅ Production deployment strategies

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [React Create App Build](https://create-react-app.dev/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## ✅ Completion Checklist

- [x] Dockerfile with multi-stage build created
- [x] Nginx production configuration implemented
- [x] Image size optimized (< 100MB)
- [x] Environment variables support added
- [x] React application containerized
- [x] Port 8080 exposed and functional
- [x] Gzip compression enabled
- [x] Caching headers configured
- [x] Docker Compose setup included
- [x] Health checks implemented
- [x] Security headers configured
- [x] Documentation completed

## 📞 Support

For issues or questions about this experiment:
1. Check Docker logs: `docker logs <container-id>`
2. Verify Docker is running: `docker --version`
3. Ensure port 8080 is available: `netstat -an | grep 8080` (Windows) or `lsof -i :8080` (macOS/Linux)
4. Review Nginx configuration: `docker exec <container-id> cat /etc/nginx/conf.d/default.conf`

---

**Experiment Status**: ✅ Complete
**Last Updated**: 2026-04-21
**Version**: 1.0.0
