# Stage 1: Build stage - Build React application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies needed for the production build
RUN npm install && \
    npm cache clean --force

# Copy application source
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Production stage - Serve with Nginx
FROM nginx:alpine AS runtime

# Set build arguments for optimization
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=1.0.0

# Add labels for metadata
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.version=$VERSION \
      org.label-schema.description="React Application with Multi-Stage Build"

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration from build context
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
