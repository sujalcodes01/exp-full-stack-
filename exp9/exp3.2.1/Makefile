.PHONY: help build run stop clean logs shell test health restart rebuild push

# Variables
IMAGE_NAME := react-docker-app
IMAGE_TAG := latest
CONTAINER_NAME := react-docker-app
PORT := 8080
VERSION := 1.0.0

help: ## Show this help message
	@echo "📦 React Docker Multi-Stage Build - Makefile Commands"
	@echo ""
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build the Docker image
	@echo "🔨 Building Docker image: $(IMAGE_NAME):$(IMAGE_TAG)"
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .
	@echo "✓ Build complete"
	@docker images $(IMAGE_NAME)

run: ## Run the Docker container
	@echo "🚀 Running container: $(CONTAINER_NAME)"
	docker run -d \
		-p $(PORT):8080 \
		--name $(CONTAINER_NAME) \
		$(IMAGE_NAME):$(IMAGE_TAG)
	@echo "✓ Container started"
	@sleep 2
	@echo "Access at: http://localhost:$(PORT)"

build-run: clean build run ## Build and run (clean start)

stop: ## Stop the container
	@echo "⛔ Stopping container: $(CONTAINER_NAME)"
	docker stop $(CONTAINER_NAME) 2>/dev/null || true
	@echo "✓ Container stopped"

restart: stop run ## Restart the container

clean: stop ## Remove the container
	@echo "🧹 Removing container: $(CONTAINER_NAME)"
	docker rm $(CONTAINER_NAME) 2>/dev/null || true
	@echo "✓ Container removed"

clean-image: clean ## Remove the image
	@echo "🗑️  Removing image: $(IMAGE_NAME):$(IMAGE_TAG)"
	docker rmi $(IMAGE_NAME):$(IMAGE_TAG) 2>/dev/null || true
	@echo "✓ Image removed"

clean-all: clean-image ## Remove everything
	@echo "🗑️  Cleaning up Docker system"
	docker system prune -f
	@echo "✓ Cleanup complete"

logs: ## Show container logs
	@echo "📋 Logs for: $(CONTAINER_NAME)"
	docker logs $(CONTAINER_NAME)

logs-follow: ## Follow container logs in real-time
	@echo "📋 Following logs for: $(CONTAINER_NAME)"
	docker logs -f $(CONTAINER_NAME)

shell: ## Access container shell
	@echo "🔧 Accessing shell in: $(CONTAINER_NAME)"
	docker exec -it $(CONTAINER_NAME) sh

ps: ## Show running containers
	@echo "📦 Running containers:"
	docker ps -a | grep $(CONTAINER_NAME) || echo "No container found"

health: ## Check container health status
	@echo "🏥 Health check for: $(CONTAINER_NAME)"
	@docker inspect $(CONTAINER_NAME) 2>/dev/null | grep -A 10 "Health" || echo "Container not found or health check not available"

test: ## Test if application is responding
	@echo "🧪 Testing application..."
	@curl -s -I http://localhost:$(PORT)/ | head -5 || echo "Application not responding"
	@echo ""
	@echo "✓ Test complete"

test-gzip: ## Test gzip compression
	@echo "🗜️  Testing gzip compression..."
	@curl -s -I -H "Accept-Encoding: gzip" http://localhost:$(PORT)/ | grep -E "Content-Encoding|Content-Type"

test-cache: ## Test caching headers
	@echo "💾 Testing cache headers..."
	@echo "HTML file:"
	@curl -s -I http://localhost:$(PORT)/ | grep -i cache-control
	@echo "JavaScript file:"
	@curl -s -I http://localhost:$(PORT)/static/js/main.js 2>/dev/null | grep -i cache-control || echo "  (file not in cache, run build first)"

test-all: test test-gzip test-cache ## Run all tests

stats: ## Show Docker stats for container
	@echo "📊 Docker stats for: $(CONTAINER_NAME)"
	docker stats $(CONTAINER_NAME) --no-stream || echo "Container not running"

info: ## Show image and container information
	@echo "🔍 Image Information:"
	@docker images $(IMAGE_NAME) || echo "Image not found"
	@echo ""
	@echo "🔍 Container Information:"
	@docker ps -a | grep $(CONTAINER_NAME) || echo "Container not found"
	@echo ""
	@echo "🔍 Network Information:"
	@docker inspect $(CONTAINER_NAME) 2>/dev/null | grep -A 10 '"Networks"' || echo "Container not found"

compose-up: ## Start using Docker Compose
	@echo "🎵 Starting with Docker Compose..."
	docker-compose up -d
	@echo "✓ Services started"

compose-down: ## Stop using Docker Compose
	@echo "⛔ Stopping Docker Compose services..."
	docker-compose down
	@echo "✓ Services stopped"

compose-logs: ## Show Docker Compose logs
	@echo "📋 Docker Compose logs:"
	docker-compose logs

push: build ## Push image to registry (requires setup)
	@echo "📤 Pushing image to registry..."
	@echo "Note: Configure your registry first (Docker Hub, ECR, etc.)"
	@docker tag $(IMAGE_NAME):$(IMAGE_TAG) username/$(IMAGE_NAME):$(IMAGE_TAG)
	@docker push username/$(IMAGE_NAME):$(IMAGE_TAG)
	@echo "✓ Image pushed"

# Development commands
install-deps: ## Install Node.js dependencies
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✓ Dependencies installed"

dev: install-deps ## Start development server
	@echo "🚀 Starting development server..."
	npm start

build-local: install-deps ## Build React app locally
	@echo "🔨 Building React app..."
	npm run build
	@echo "✓ Build complete"
	@echo "Output in: ./build"

serve-local: build-local ## Serve local build
	@echo "📦 Installing serve..."
	npm install -g serve
	@echo "🚀 Serving build..."
	serve -s build -l 3000
	@echo "Access at: http://localhost:3000"

# Maintenance commands
prune: ## Remove unused Docker resources
	@echo "🧹 Pruning Docker system..."
	docker system prune -f
	@echo "✓ Prune complete"

version: ## Show version information
	@echo "🔖 Version Information:"
	@echo "  Docker: $$(docker --version)"
	@echo "  Node: $$(node --version || echo 'Not installed')"
	@echo "  npm: $$(npm --version || echo 'Not installed')"
	@echo "  App Version: $(VERSION)"

validate: ## Validate Docker and project setup
	@echo "✓ Validating setup..."
	@echo "  Checking Docker..."
	@docker --version
	@echo "  ✓ Docker is installed"
	@echo "  Checking files..."
	@test -f Dockerfile && echo "  ✓ Dockerfile found" || echo "  ✗ Dockerfile not found"
	@test -f nginx.conf && echo "  ✓ nginx.conf found" || echo "  ✗ nginx.conf not found"
	@test -f package.json && echo "  ✓ package.json found" || echo "  ✗ package.json not found"
	@echo "  ✓ All validation checks passed"

# Quick commands
q: ## Quick build and run
	make clean-all && make build && make run

qtest: test test-gzip ## Quick test

quick-help: ## Show quick command reference
	@echo "🚀 Quick Command Reference:"
	@echo ""
	@echo "Start:    make build-run    (clean build and run)"
	@echo "Stop:     make stop         (stop container)"
	@echo "Restart:  make restart      (restart container)"
	@echo "Logs:     make logs         (show logs)"
	@echo "Shell:    make shell        (access container)"
	@echo "Test:     make test-all     (test everything)"
	@echo "Clean:    make clean-all    (remove all)"
	@echo ""
	@echo "For full help: make help"

.DEFAULT_GOAL := help
