# Experiment 3.2.1 - Setup & Execution Guide

## 🚀 Quick Start Instructions

This document provides step-by-step instructions to build and run the Docker container.

### Prerequisites Verification

Before proceeding, ensure you have:

```bash
# Check Docker installation (Windows PowerShell or Command Prompt)
docker --version
# Expected output: Docker version 20.10+

# Check Node.js installation (Windows PowerShell or Command Prompt)
node --version
# Expected output: v18.0.0 or higher
```

If either is not installed:
- **Docker**: Download from https://www.docker.com/products/docker-desktop
- **Node.js**: Download from https://nodejs.org/ (select LTS version)

---

## 🛠️ Building the Docker Image

### Method 1: Using the Build Script (Recommended for Windows)

**Windows Users:**
```cmd
# Open Command Prompt or PowerShell in the project directory
cd "c:\Users\sujal\OneDrive\Desktop\coding\full stack\exp9\exp3.2.1"

# Run the build script
build.bat latest
```

**Linux/macOS Users:**
```bash
cd "/path/to/exp3.2.1"
chmod +x build.sh
./build.sh latest
```

### Method 2: Using Docker Compose (Cross-Platform)

```bash
# Navigate to project directory
cd "c:\Users\sujal\OneDrive\Desktop\coding\full stack\exp9\exp3.2.1"

# Build and run with Docker Compose
docker-compose up --build -d
```

### Method 3: Manual Docker Build

```bash
# Navigate to project directory
cd "c:\Users\sujal\OneDrive\Desktop\coding\full stack\exp9\exp3.2.1"

# Build the image
docker build -t react-docker-app:latest .

# Run the container
docker run -d -p 8080:8080 --name react-docker-app react-docker-app:latest
```

### Build with Custom Metadata (Advanced)

```bash
# With build arguments
docker build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --build-arg VERSION=1.0.0 \
  -t react-docker-app:1.0.0 .
```

---

## ✅ Verification Steps

### 1. Check Image was Built

```bash
# List Docker images
docker images

# You should see:
# REPOSITORY            TAG       IMAGE ID       SIZE
# react-docker-app      latest    <id>          50-70MB
```

### 2. Verify Container is Running

```bash
# List running containers
docker ps

# You should see:
# CONTAINER ID   IMAGE                      PORTS                  STATUS
# <id>          react-docker-app:latest    0.0.0.0:8080->8080/tcp   Up 2 minutes (healthy)
```

### 3. Test the Application

**Option A: Using Browser**
- Open: http://localhost:8080
- Should display the React app with Docker experiment information

**Option B: Using Command Line**
```bash
# Test with curl
curl http://localhost:8080/

# Test with PowerShell
Invoke-WebRequest -Uri "http://localhost:8080/"

# Check gzip compression
curl -I -H "Accept-Encoding: gzip" http://localhost:8080/
```

### 4. Check Container Logs

```bash
# View logs
docker logs react-docker-app

# Follow logs in real-time
docker logs -f react-docker-app

# View specific number of lines
docker logs --tail 50 react-docker-app
```

### 5. Verify Nginx Configuration

```bash
# Access container shell
docker exec -it react-docker-app sh

# Inside container:
# View Nginx config
cat /etc/nginx/conf.d/default.conf

# Check Nginx is running
ps aux | grep nginx

# Test locally
wget http://localhost:8080/
```

### 6. Check Caching Headers

```bash
# HTML file (should have 1 hour cache)
curl -I http://localhost:8080/
# Look for: Cache-Control: public, must-revalidate

# JavaScript file (should have 1 year cache)
curl -I http://localhost:8080/static/js/main.js
# Look for: Cache-Control: public, immutable

# CSS file (should have 1 year cache)
curl -I http://localhost:8080/static/css/main.css
# Look for: Cache-Control: public, immutable
```

### 7. Verify Gzip Compression

```bash
# Check if gzip compression is working
curl -I -H "Accept-Encoding: gzip" http://localhost:8080/
# Look for: Content-Encoding: gzip

# Compare sizes (gzip should be smaller)
curl -s http://localhost:8080/ | wc -c        # Original size
curl -s -H "Accept-Encoding: gzip" http://localhost:8080/ | wc -c  # Compressed
```

### 8. Health Check Status

```bash
# Check if container is healthy
docker inspect react-docker-app | grep -A 10 "Health"

# Output should show:
# "Health": {
#     "Status": "healthy",
#     "FailingStreak": 0,
#     ...
# }
```

---

## 🎯 Expected Output Checklist

After successful setup, verify:

✅ **Image Size**: Under 100MB (typically 50-70MB)
```bash
docker images react-docker-app
# SIZE column should show < 100MB
```

✅ **Port 8080 Accessible**: Application responds on port 8080
```bash
curl -I http://localhost:8080
# HTTP/1.1 200 OK
```

✅ **Gzip Compression**: Enabled for text assets
```bash
curl -I -H "Accept-Encoding: gzip" http://localhost:8080/
# Content-Encoding: gzip
```

✅ **Caching Headers**: Properly configured
```bash
curl -I http://localhost:8080/
# Should include Cache-Control headers
```

✅ **Container Healthy**: Health check passes
```bash
docker ps
# STATUS column shows "Up X minutes (healthy)"
```

✅ **Nginx Running**: Web server operational
```bash
docker exec react-docker-app ps aux | grep nginx
# Should show nginx master and worker processes
```

✅ **React App Loaded**: Browser displays correctly
- Open: http://localhost:8080
- Should display Docker experiment information
- Environment variables displayed

---

## 🛑 Stopping and Cleaning Up

### Stop the Container

```bash
# Stop container
docker stop react-docker-app

# Remove container
docker rm react-docker-app
```

### Remove with Docker Compose

```bash
docker-compose down
```

### Remove All Related Resources

```bash
# Stop and remove container
docker stop react-docker-app && docker rm react-docker-app

# Remove image
docker rmi react-docker-app:latest

# Clean up unused resources
docker system prune -a
```

---

## 🐛 Troubleshooting

### Issue: Docker is not installed

**Solution:**
1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop
3. Verify: `docker --version`

### Issue: Port 8080 is already in use

**Solution A: Use different port**
```bash
docker run -d -p 8081:8080 react-docker-app:latest
# Then access: http://localhost:8081
```

**Solution B: Stop existing service**
```bash
# Find what's using port 8080
netstat -ano | findstr :8080  # Windows

# Kill the process
taskkill /PID <PID> /F  # Windows
```

### Issue: Container exits immediately

**Solution:**
```bash
# Check logs for errors
docker logs react-docker-app

# Try building again
docker build -t react-docker-app:latest .

# Run with interactive mode for debugging
docker run -it react-docker-app:latest
```

### Issue: Application not responding

**Solution:**
```bash
# Check container is running
docker ps -a

# Check logs
docker logs react-docker-app

# Verify port mapping
docker port react-docker-app

# Restart container
docker restart react-docker-app

# Wait a few seconds and try again
# docker exec react-docker-app wget http://localhost:8080
```

### Issue: High image size (> 100MB)

**Solution:**
1. Ensure you're using Alpine images (check Dockerfile)
2. Verify .dockerignore excludes unnecessary files
3. Rebuild: `docker build --no-cache -t react-docker-app:latest .`

### Issue: Caching headers not showing

**Solution:**
```bash
# Check Nginx configuration
docker exec react-docker-app cat /etc/nginx/conf.d/default.conf

# Verify nginx.conf is copied correctly
docker exec react-docker-app ls -la /etc/nginx/conf.d/

# Restart Nginx
docker exec react-docker-app nginx -s reload
```

---

## 📊 Performance Testing

### Measure Build Time

```bash
# With time measurement (Linux/macOS)
time docker build -t react-docker-app:test .

# Subsequent builds (should be faster due to caching)
time docker build -t react-docker-app:test .
```

### Measure Image Size

```bash
# Show size of image
docker images react-docker-app

# Inspect detailed information
docker inspect react-docker-app:latest

# Calculate compression efficiency
# Compare uncompressed vs compressed size
```

### Load Testing (Optional)

```bash
# Install Apache Bench (ab)
# macOS: brew install httpd
# Windows: Download from Apache website
# Linux: apt-get install apache2-utils

# Run load test
ab -n 1000 -c 10 http://localhost:8080/

# View results for:
# - Requests per second
# - Average response time
# - Bytes per second
```

---

## 📝 Development vs Production

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Your app runs on http://localhost:3000 with hot reloading
```

### Production Deployment (Docker)

```bash
# Build Docker image
docker build -t react-docker-app:latest .

# Run container
docker run -d -p 8080:8080 react-docker-app:latest

# Your app runs on http://localhost:8080 via Nginx
```

### Key Differences

| Aspect | Development | Production |
|--------|------------|-----------|
| Server | Webpack Dev Server | Nginx |
| Hot Reload | ✅ Enabled | ❌ Not available |
| Optimization | Debug mode | Minified & optimized |
| Bundle Size | Large (dev tools) | Optimized |
| Build Time | Instant | 2-3 minutes |
| Deploy Method | npm start | Docker container |

---

## 🎓 Learning Outcomes Verification

After completing this experiment, you should be able to:

- [x] Explain multi-stage Docker builds
- [x] Understand React containerization
- [x] Configure Nginx for static content
- [x] Implement caching strategies
- [x] Enable gzip compression
- [x] Handle environment variables
- [x] Optimize image size
- [x] Monitor container health
- [x] Debug Docker issues
- [x] Deploy production containers

---

## 📚 Additional Resources

### Official Documentation
- Docker: https://docs.docker.com/
- Nginx: https://nginx.org/en/docs/
- React: https://react.dev/
- Node.js: https://nodejs.org/docs/

### Docker Best Practices
- https://docs.docker.com/develop/dev-best-practices/
- https://docs.docker.com/develop/guidelines/Dockerfile_best-practices/

### Container Security
- https://docs.docker.com/engine/security/
- OWASP Container Security: https://cheatsheetseries.owasp.org/

### Performance Optimization
- Nginx Performance: https://nginx.org/en/docs/http/ngx_http_gzip_module.html
- Docker Multi-stage: https://docs.docker.com/build/building/multi-stage/

---

## ✅ Completion Verification

Run this command to verify all requirements are met:

```bash
#!/bin/bash

echo "Verifying Experiment 3.2.1 Completion..."
echo ""

# Check image exists
echo "✓ Checking Docker image..."
docker images | grep react-docker-app >/dev/null && echo "  ✅ Image found" || echo "  ❌ Image not found"

# Check image size
echo "✓ Checking image size (<100MB)..."
SIZE=$(docker images --format "{{.Size}}" | grep -m1 react-docker-app)
echo "  Image size: $SIZE"

# Check container running
echo "✓ Checking container status..."
docker ps | grep react-docker-app >/dev/null && echo "  ✅ Container running" || echo "  ⚠️  Container not running"

# Check port 8080
echo "✓ Checking port 8080..."
docker port react-docker-app 2>/dev/null | grep 8080 >/dev/null && echo "  ✅ Port 8080 exposed" || echo "  ⚠️  Port not exposed"

# Check application responds
echo "✓ Testing application response..."
curl -s http://localhost:8080/ >/dev/null && echo "  ✅ Application responding" || echo "  ⚠️  Application not responding"

# Check gzip
echo "✓ Checking gzip compression..."
curl -s -I -H "Accept-Encoding: gzip" http://localhost:8080/ | grep -i "gzip" >/dev/null && echo "  ✅ Gzip enabled" || echo "  ⚠️  Gzip not enabled"

# Check health
echo "✓ Checking container health..."
STATUS=$(docker inspect react-docker-app 2>/dev/null | grep '"Status"' | head -1 | grep -o "healthy\|unhealthy\|starting")
echo "  Health status: $STATUS"

echo ""
echo "✅ Experiment 3.2.1 verification complete!"
```

Save as `verify.sh` and run: `./verify.sh`

---

**Document Version**: 1.0.0
**Last Updated**: April 21, 2026
**Status**: Production Ready
