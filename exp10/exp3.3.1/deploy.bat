@echo off
chcp 65001 >nul
echo 🚀 MERN Todo App Deployment Script
echo ===================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing git repository...
    git init
)

echo.
echo Step 1: Commit all changes
git add .
git commit -m "Prepare for deployment"

echo.
echo Step 2: GitHub Repository Setup
echo Please create a new repository on GitHub first:
echo https://github.com/new
echo.
set /p GITHUB_USER="Enter your GitHub username: "
set /p REPO_NAME="Enter repository name (e.g., mern-todo-app): "

echo.
echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ===================================
echo ✅ GitHub Repository Updated!
echo URL: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.
echo Next Steps for Vercel Deployment:
echo 1. Go to https://vercel.com/new
echo 2. Import your GitHub repository
echo 3. Select the 'frontend' directory as root
echo 4. Add Environment Variables:
echo    - REACT_APP_API_URL=your-backend-url
echo.
pause

