# RBAC App (Experiment 3.1.3)

A full-stack example demonstrating Role-Based Access Control with:
- React 18 + React Router 6 frontend
- Express 4 backend
- MongoDB + Mongoose 7

## Features
- Admin-only dashboard
- Role-aware frontend menu
- Protected API routes
- User profile and auth

## Setup
1. Copy `.env.example` to `.env`.
2. Install dependencies:
   - `npm run install:all`
3. Start both server and client:
   - `npm run dev`

## Default behavior
- `POST /api/auth/login` returns a JWT and user role
- `GET /api/admin/dashboard` is admin-only
- `GET /api/users` is admin-only
- Logged-in users can access `/profile`

## Default admin
The server creates a default admin if none exists:
- Email: `admin@example.com`
- Password: `Admin@123`

## Notes
- Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.
