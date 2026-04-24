#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  React Docker Multi-Stage Build - Build Script${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"

# Configuration
IMAGE_NAME="react-docker-app"
IMAGE_TAG=${1:-"latest"}
CONTAINER_NAME="react-docker-app"
PORT="8080"
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

# Function to print section headers
print_header() {
    echo -e "\n${BLUE}▶ $1${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to print info
print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Docker is installed
print_header "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker 20.10+"
    exit 1
fi
print_success "Docker is installed: $(docker --version)"

# Check if Docker daemon is running
print_header "Checking Docker daemon..."
if ! docker ps &> /dev/null; then
    print_error "Docker daemon is not running. Please start Docker."
    exit 1
fi
print_success "Docker daemon is running"

# Build the Docker image
print_header "Building Docker image..."
echo "Image Name: $IMAGE_NAME:$IMAGE_TAG"
echo "Build Date: $BUILD_DATE"
echo "VCS Reference: $VCS_REF"

docker build \
    --build-arg BUILD_DATE=$BUILD_DATE \
    --build-arg VCS_REF=$VCS_REF \
    --build-arg VERSION=$IMAGE_TAG \
    -t $IMAGE_NAME:$IMAGE_TAG .

if [ $? -ne 0 ]; then
    print_error "Docker build failed"
    exit 1
fi
print_success "Docker image built successfully"

# Display image information
print_header "Image Information"
docker images | grep $IMAGE_NAME | head -1 | awk '{print "Repository:", $1; print "Tag:", $2; print "Image ID:", $3; print "Size:", $5}'

# Calculate actual image size in MB
IMAGE_SIZE=$(docker images --format "table {{.Size}}" | grep -m1 "MB\|GB")
print_info "Final Image Size: $IMAGE_SIZE"

# Stop existing container if running
print_header "Stopping existing containers..."
if docker ps -a | grep -q $CONTAINER_NAME; then
    docker stop $CONTAINER_NAME 2>/dev/null
    docker rm $CONTAINER_NAME 2>/dev/null
    print_success "Old container stopped and removed"
else
    print_info "No existing container found"
fi

# Run the Docker container
print_header "Running Docker container..."
docker run -d \
    -p $PORT:8080 \
    --name $CONTAINER_NAME \
    --healthcheck=cmd-shell=cmd:wget\ --no-verbose\ --tries=1\ --spider\ http://localhost:8080/\ \|\|\ exit\ 1 \
    $IMAGE_NAME:$IMAGE_TAG

if [ $? -ne 0 ]; then
    print_error "Failed to run container"
    exit 1
fi
print_success "Container started successfully"

# Wait for container to be healthy
print_header "Waiting for container to be ready..."
sleep 3

HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' $CONTAINER_NAME 2>/dev/null)
if [ "$HEALTH_STATUS" == "healthy" ] || [ -z "$HEALTH_STATUS" ]; then
    print_success "Container is ready"
else
    print_info "Container status: $HEALTH_STATUS"
fi

# Display container information
print_header "Container Information"
CONTAINER_ID=$(docker ps --filter "name=$CONTAINER_NAME" --format "{{.ID}}")
echo "Container ID: $CONTAINER_ID"
echo "Container Name: $CONTAINER_NAME"
echo "Port Mapping: localhost:$PORT → container:8080"
docker inspect $CONTAINER_NAME | grep -A 5 '"Networks"' | head -6

# Test the application
print_header "Testing Application..."
echo "Waiting 2 seconds for Nginx to fully start..."
sleep 2

if curl -s http://localhost:$PORT/ > /dev/null; then
    print_success "Application is responding on http://localhost:$PORT"
else
    print_error "Application is not responding"
fi

# Display important URLs
print_header "Access Information"
echo "Application URL: http://localhost:$PORT"
echo "Container Logs: docker logs $CONTAINER_NAME"
echo "Shell Access: docker exec -it $CONTAINER_NAME sh"
echo "Stop Container: docker stop $CONTAINER_NAME"
echo "Remove Container: docker rm $CONTAINER_NAME"
echo "Remove Image: docker rmi $IMAGE_NAME:$IMAGE_TAG"

# Summary
print_header "Build Summary"
echo "✓ Docker image built and tagged: $IMAGE_NAME:$IMAGE_TAG"
echo "✓ Container running: $CONTAINER_NAME"
echo "✓ Application accessible on: http://localhost:$PORT"

echo -e "\n${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Build Complete! Open http://localhost:$PORT in your browser${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}\n"
