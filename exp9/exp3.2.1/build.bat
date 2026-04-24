@echo off
REM React Docker Multi-Stage Build - Windows Build Script

setlocal enabledelayedexpansion

REM Colors and formatting (Windows 10+ with ANSI support)
set "RESET=[0m"
set "BLUE=[34m"
set "GREEN=[32m"
set "RED=[31m"
set "YELLOW=[33m"

REM Configuration
set IMAGE_NAME=react-docker-app
set IMAGE_TAG=%1
if "%IMAGE_TAG%"=="" set IMAGE_TAG=latest
set CONTAINER_NAME=react-docker-app
set PORT=8080
set BUILD_DATE=%date% %time%

cls
echo.
echo %BLUE%==========================================================%RESET%
echo %BLUE%  React Docker Multi-Stage Build - Windows Build Script%RESET%
echo %BLUE%==========================================================%RESET%
echo.

REM Check if Docker is installed
echo %BLUE%^> Checking Docker installation...%RESET%
docker --version >nul 2>&1
if errorlevel 1 (
    echo %RED%✗ Docker is not installed. Please install Docker Desktop for Windows.%RESET%
    exit /b 1
)
echo %GREEN%✓ Docker is installed%RESET%
docker --version

REM Check if Docker daemon is running
echo.
echo %BLUE%^> Checking Docker daemon...%RESET%
docker ps >nul 2>&1
if errorlevel 1 (
    echo %RED%✗ Docker daemon is not running. Please start Docker Desktop.%RESET%
    exit /b 1
)
echo %GREEN%✓ Docker daemon is running%RESET%

REM Build the Docker image
echo.
echo %BLUE%^> Building Docker image...%RESET%
echo Image Name: %IMAGE_NAME%:%IMAGE_TAG%
docker build -t %IMAGE_NAME%:%IMAGE_TAG% .

if errorlevel 1 (
    echo %RED%✗ Docker build failed%RESET%
    exit /b 1
)
echo %GREEN%✓ Docker image built successfully%RESET%

REM Display image information
echo.
echo %BLUE%^> Image Information%RESET%
docker images | find "%IMAGE_NAME%"

REM Stop existing container if running
echo.
echo %BLUE%^> Stopping existing containers...%RESET%
docker ps -a | find "%CONTAINER_NAME%" >nul 2>&1
if %errorlevel% equ 0 (
    docker stop %CONTAINER_NAME% >nul 2>&1
    docker rm %CONTAINER_NAME% >nul 2>&1
    echo %GREEN%✓ Old container stopped and removed%RESET%
) else (
    echo %YELLOW%ℹ No existing container found%RESET%
)

REM Run the Docker container
echo.
echo %BLUE%^> Running Docker container...%RESET%
docker run -d -p %PORT%:8080 --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%

if errorlevel 1 (
    echo %RED%✗ Failed to run container%RESET%
    exit /b 1
)
echo %GREEN%✓ Container started successfully%RESET%

REM Wait for container to be ready
echo.
echo %BLUE%^> Waiting for container to be ready...%RESET%
timeout /t 3 /nobreak >nul
echo %GREEN%✓ Container is ready%RESET%

REM Display container information
echo.
echo %BLUE%^> Container Information%RESET%
docker ps --filter "name=%CONTAINER_NAME%"
echo.

REM Test the application
echo %BLUE%^> Testing Application...%RESET%
timeout /t 2 /nobreak >nul

REM Using PowerShell for curl test
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:%PORT%/' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '%GREEN%✓ Application is responding on http://localhost:%PORT%%RESET%' } } catch { Write-Host '%RED%✗ Application is not responding%RESET%' }"

REM Display important information
echo.
echo %BLUE%^> Access Information%RESET%
echo Application URL: http://localhost:%PORT%
echo.
echo %BLUE%^> Useful Commands%RESET%
echo View logs:        docker logs %CONTAINER_NAME%
echo Follow logs:      docker logs -f %CONTAINER_NAME%
echo Shell access:     docker exec -it %CONTAINER_NAME% sh
echo Stop container:   docker stop %CONTAINER_NAME%
echo Remove container: docker rm %CONTAINER_NAME%
echo Remove image:     docker rmi %IMAGE_NAME%:%IMAGE_TAG%
echo.

REM Summary
echo %BLUE%==========================================================%RESET%
echo %GREEN%Build Complete! Open http://localhost:%PORT% in your browser%RESET%
echo %BLUE%==========================================================%RESET%
echo.

endlocal
