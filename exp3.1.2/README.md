# Protected Routes with JWT Verification

This project demonstrates JWT authentication with protected routes using React Router and Express middleware.

## Features

- JWT authentication setup
- Protected route logic
- Token verification on server
- Route guards in React
- Express middleware for JWT verification

## Tech Stack

- **Frontend**: React 18+, React Router 6+, Axios 1.6+
- **Backend**: Express 4+, jsonwebtoken 9+, bcryptjs

## Installation

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
   The React app will run on http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Login with username: `admin` and password: `password`
3. You will be redirected to the dashboard
4. Try accessing the dashboard directly without logging in - you should be redirected to login
5. Logout to test the authentication flow

## API Endpoints

- `POST /api/auth/login` - Login endpoint
- `GET /api/protected` - Protected route (requires JWT token in header)

## Expected Output

- Login redirects unauthenticated users
- Authenticated users can access private routes
- JWT verified on server
- Token stored in localStorage