# Experiment 3.2.1 - Project Files Documentation

## Complete File Structure

```
exp3.2.1/
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Styling for App component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── public/
│   └── index.html          # HTML template
├── Dockerfile              # Multi-stage Docker build configuration
├── nginx.conf              # Production Nginx configuration
├── docker-compose.yml      # Docker Compose orchestration
├── package.json            # Node.js dependencies and scripts
├── .env                    # Environment variables
├── .dockerignore           # Files to exclude from Docker image
├── .gitignore              # Git ignore patterns
├── build.sh                # Bash build script
├── build.bat               # Windows batch build script
├── README.md               # Complete documentation
└── FILES.md                # This file
```

## File-by-File Breakdown

### 📦 React Application Files

#### `package.json`
- **Purpose**: Node.js project configuration and dependencies
- **Contains**:
  - Project metadata and version
  - React 18+ dependencies
  - Build scripts (start, build, test, eject)
  - ESLint and browserslist configuration
- **Key Features**:
  - Minimal dependencies for smaller bundle
  - Production-optimized build setup

#### `public/index.html`
- **Purpose**: HTML template for React app
- **Contains**:
  - Meta tags for responsiveness and branding
  - Root div where React mounts
  - SEO metadata
- **Key Features**:
  - Semantic HTML5 structure
  - Mobile-friendly viewport settings

#### `src/index.js`
- **Purpose**: React application entry point
- **Contains**:
  - React 18 createRoot initialization
  - StrictMode wrapper for development checks
  - CSS imports
- **Key Features**:
  - Modern React 18 API
  - Component mounting setup

#### `src/index.css`
- **Purpose**: Global styling
- **Contains**:
  - Font families and smoothing
  - Base element styles
  - Full-height layout
- **Key Features**:
  - Cross-platform font stack
  - Anti-aliased text rendering

#### `src/App.js`
- **Purpose**: Main React component
- **Contains**:
  - Informative UI about Docker setup
  - Feature cards with checkmarks
  - Environment variable display
- **Key Features**:
  - Educational content about the experiment
  - Responsive component layout
  - Environment variable integration

#### `src/App.css`
- **Purpose**: Component-level styling
- **Contains**:
  - Gradient background
  - Card components with hover effects
  - Responsive grid layout
  - Media queries for mobile
- **Key Features**:
  - Modern CSS with gradients
  - Glassmorphism design (frosted glass effect)
  - Mobile-responsive design
  - Smooth animations and transitions

### 🐳 Docker Configuration Files

#### `Dockerfile`
- **Purpose**: Multi-stage Docker build configuration
- **Build Stage**:
  - Uses `node:18-alpine` (lightweight)
  - Installs dependencies with `npm ci`
  - Builds React app to production bundle
- **Runtime Stage**:
  - Uses `nginx:alpine` (minimal footprint)
  - Applies custom Nginx configuration
  - Copies only built files from build stage
  - Includes health checks
  - Exposes port 8080
- **Key Features**:
  - Multi-stage build reduces final image size
  - Build dependencies not included in final image
  - Alpine Linux reduces base image size
  - Health check for container monitoring

#### `nginx.conf`
- **Purpose**: Production Nginx configuration
- **Compression Settings**:
  - Gzip compression enabled
  - Compression level 6 (optimal balance)
  - Supports: CSS, JavaScript, JSON, XML, HTML
- **Caching Headers**:
  - HTML: 1 hour with must-revalidate
  - JS/CSS: 1 year with immutable flag
  - Images: 1 year with immutable flag
  - Fonts: 1 year with immutable flag
- **Security Headers**:
  - X-Frame-Options: SAMEORIGIN (clickjacking protection)
  - X-Content-Type-Options: nosniff (MIME sniffing prevention)
  - X-XSS-Protection: Enabled (XSS protection)
  - Referrer-Policy: Controlled referrer sharing
- **Router Support**:
  - All requests route to index.html for client-side routing
  - Dynamic route handling without server config
- **Performance**:
  - Gzip buffer optimization
  - Disabled logging for favicon/robots.txt
  - Error page handling

#### `docker-compose.yml`
- **Purpose**: Docker Compose orchestration
- **Services**:
  - Single `react-app` service
  - Build configuration with arguments
  - Port mapping: 8080:8080
  - Environment variables setup
  - Health checks
- **Key Features**:
  - Easy one-command build and run
  - Network isolation
  - Health monitoring
  - Restart policy

### 📝 Configuration Files

#### `.env`
- **Purpose**: Environment variables
- **Variables**:
  - `REACT_APP_API_URL`: API endpoint configuration
  - `NODE_ENV`: Production environment flag
- **Usage**: Injected during build process

#### `.dockerignore`
- **Purpose**: Exclude files from Docker build context
- **Excludes**:
  - Git files and node_modules
  - IDE configurations (.vscode, .idea)
  - Build artifacts and logs
  - Testing and documentation files
  - CI/CD configuration
- **Benefit**: Reduces build context size for faster builds

#### `.gitignore`
- **Purpose**: Exclude files from Git version control
- **Excludes**:
  - Dependencies, build output, environment files
  - IDE files and OS-specific files
  - Logs and sensitive data
- **Benefit**: Keeps repository clean

### 🚀 Build Scripts

#### `build.sh` (Linux/macOS)
- **Purpose**: Automated build script for Unix systems
- **Features**:
  - Color-coded output
  - Docker installation check
  - Daemon status verification
  - Image building with metadata
  - Container management
  - Application testing
  - Comprehensive logging
- **Usage**: `chmod +x build.sh && ./build.sh [tag]`

#### `build.bat` (Windows)
- **Purpose**: Automated build script for Windows
- **Features**:
  - Windows-compatible Docker commands
  - Container lifecycle management
  - Status reporting
  - Error handling
- **Usage**: `build.bat [tag]` or `build.bat latest`

### 📚 Documentation Files

#### `README.md`
- **Purpose**: Complete project documentation
- **Sections**:
  - Project overview and objectives
  - Prerequisites and requirements
  - Quick start guides (3 methods)
  - Docker configuration details
  - Nginx features explanation
  - Environment variable handling
  - Health check documentation
  - Build arguments reference
  - Testing procedures
  - Performance metrics
  - Debugging guide
  - Learning outcomes
- **Audience**: Developers and DevOps engineers

#### `FILES.md` (This file)
- **Purpose**: Detailed file structure documentation
- **Content**:
  - File organization
  - Purpose of each file
  - Key features and configurations
  - Integration points

## Key Configuration Details

### Image Size Optimization

The final Docker image is optimized to be under 100MB through:

1. **Multi-Stage Build**
   - Build stage includes Node.js, npm, and build tools
   - Runtime stage includes only Nginx and built files
   - Build dependencies completely removed from final image

2. **Alpine Linux**
   - Both Node and Nginx use Alpine variants
   - Alpine is ~130MB smaller than standard Linux
   - Still includes all necessary components

3. **Minimal Dependencies**
   - Only production dependencies installed
   - Development dependencies excluded
   - .dockerignore excludes unnecessary files

4. **Layer Optimization**
   - Proper ordering of Dockerfile commands
   - Leverages layer caching
   - Minimizes final layer size

### Environment Variables

Three ways to use environment variables:

1. **Build-time**: Used during `npm run build`
   - Embedded in JavaScript bundle
   - Accessible as `process.env.REACT_APP_*`

2. **Runtime**: Docker environment configuration
   - Set in docker-compose.yml or `docker run -e`
   - Can be changed without rebuilding

3. **Development**: .env file
   - Used by react-scripts during `npm start`
   - Not included in Docker build

### Port Configuration

- **External**: Port 8080 (recommended for containers)
- **Internal**: Port 8080 (Nginx listening port)
- **Rationale**: Avoid privileged ports, reduces security risk

### Nginx Server Block

The server block configuration:
- Listens on port 8080 (IPv4 and IPv6)
- Uses `/usr/share/nginx/html` as document root
- Serves index.html as default
- Routes all requests to index.html (SPA support)

## Integration Points

### React ↔ Nginx
- React build output → Nginx static files directory
- Dynamic routes → Client-side handled (via index.html routing)

### Environment Variables ↔ React App
- REACT_APP_* variables embedded during build
- Accessible in browser via `process.env`

### Docker ↔ System
- Port 8080 exposed for browser access
- Health checks monitor container status
- Logs available via `docker logs`

## Performance Characteristics

### Build Performance
- **First Build**: 2-3 minutes
- **Subsequent Builds**: 30-60 seconds (with caching)
- **Caching**: Leverages Docker layer caching

### Runtime Performance
- **Startup Time**: < 2 seconds
- **Memory Usage**: 30-50MB
- **CPU Usage**: Minimal when idle
- **Gzip Compression**: Reduces transfer size by 60-80%

## Security Features

1. **Container Security**
   - Non-root user execution in Nginx
   - Health check for availability monitoring
   - Minimal attack surface

2. **HTTP Security Headers**
   - Clickjacking protection (X-Frame-Options)
   - MIME sniffing prevention
   - XSS protection headers
   - Referrer policy control

3. **Access Control**
   - Hidden files/directories blocked
   - Backup files access denied
   - Favicon/robots.txt logging disabled

## Customization Guide

### Changing Port
1. Update `docker-compose.yml`: ports section
2. Update `nginx.conf`: listen directive
3. Update `build.sh`/`build.bat`: PORT variable
4. Rebuild container

### Changing Base Image
1. Update Dockerfile Node version: `FROM node:XX-alpine`
2. Update Dockerfile Nginx version: `FROM nginx:VERSION-alpine`
3. Rebuild: `docker build -t react-docker-app .`

### Adding API Integration
1. Update `src/App.js`: API calls
2. Update `.env`: `REACT_APP_API_URL`
3. Update `nginx.conf`: Add proxy directives for API
4. Rebuild and test

### Modifying Cache Headers
1. Update `nginx.conf`: location blocks
2. Adjust `expires` and `Cache-Control` headers
3. Reload Nginx: `docker exec <container> nginx -s reload`

## Version Information

- **React**: 18.2.0+
- **Node**: 18 LTS
- **Nginx**: Latest stable Alpine
- **Docker**: 20.10+
- **Experiment**: 3.2.1
- **Status**: Complete and Production-Ready

---

All files are configured to work together seamlessly for a production-ready React Docker deployment.
