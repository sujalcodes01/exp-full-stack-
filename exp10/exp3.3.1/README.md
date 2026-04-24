# 📝 MERN Todo Application with Advanced Features

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js) featuring advanced UI/UX, drag-and-drop, voice input, progress tracking, and more.

## ✨ Features

### Core Features
- ✅ **Create** - Add new todo items with title, category, priority, and due date
- ✅ **Read** - Display todos with search, filter, and sort capabilities
- ✅ **Update** - Toggle completion status, edit subtasks
- ✅ **Delete** - Remove todos with smooth animations

### Advanced Features
- 🌓 **Dark/Light Mode** - Toggle with persistent storage
- 💎 **Glassmorphism Design** - Modern frosted glass UI
- 🎨 **Gradient Backgrounds** - Beautiful animated gradients
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 🔍 **Search** - Real-time search through todos
- 🏷️ **Categories** - Study, Work, Personal, Other
- ⚡ **Priority System** - High, Medium, Low with color coding
- 📅 **Due Dates** - With overdue detection
- 📊 **Progress Tracking** - Completion rate, daily stats, celebration messages
- 🔄 **Drag & Drop** - Reorder todos with react-beautiful-dnd
- 📋 **Subtasks** - Add and manage subtasks within todos
- 🎤 **Voice Input** - Web Speech API for hands-free todo creation
- 📱 **Responsive Design** - Works on all screen sizes

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Framer Motion, react-beautiful-dnd, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Styling | CSS3 with CSS Variables, Glassmorphism |
| Deployment | Vercel (Frontend), Render (Backend) |

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd exp3.3.1
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
```

Start the server:
```bash
npm start
# or for development
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## 📦 Deployment Guide

### Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `todo-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
5. Add Environment Variables:
   - `PORT`: `10000` (Render assigns this automatically)
   - `MONGODB_URI`: Your MongoDB Atlas connection string
6. Click "Create Web Service"

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy:
   ```bash
   cd frontend
   vercel
   ```
4. Follow the prompts and select your project
5. Add Environment Variable:
   - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://todo-backend.onrender.com`)

### Alternative: Deploy Frontend via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_API_URL`: Your Render backend URL
6. Click "Deploy"

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📁 Project Structure

```
exp3.3.1/
├── backend/
│   ├── models/
│   │   └── Todo.js          # Mongoose schema
│   ├── routes/
│   │   └── todoRoutes.js    # REST API endpoints
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTodo.js
│   │   │   ├── TodoItem.js
│   │   │   ├── TodoList.js
│   │   │   ├── ThemeToggle.js
│   │   │   ├── ProgressTracker.js
│   │   │   └── SearchFilter.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── vercel.json
├── .gitignore
└── README.md
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PUT | `/api/todos/:id/subtasks` | Add subtask |
| PUT | `/api/todos/:id/subtasks/:index` | Toggle subtask |
| PUT | `/api/todos/reorder/bulk` | Reorder todos |
| GET | `/api/todos/stats` | Get statistics |

## 🎨 Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#667eea` | Buttons, accents |
| Secondary | `#764ba2` | Gradients |
| Success | `#10b981` | Completed items |
| Warning | `#f59e0b` | Medium priority |
| Danger | `#ef4444` | High priority, overdue |
| Info | `#3b82f6` | Study category |

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- Built for Experiment 3.3.1 - Full Stack Development Course
- Icons by [Lucide React](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion)
- Drag & Drop by [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

