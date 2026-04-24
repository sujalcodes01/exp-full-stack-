import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import ProgressTracker from './components/ProgressTracker';
import SearchFilter from './components/SearchFilter';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Stats
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = todos.filter(t => t.priority === 'High' && !t.completed).length;
    const today = new Date().toDateString();
    const todayCompleted = todos.filter(t => {
      if (!t.completed) return false;
      const updated = new Date(t.updatedAt);
      return updated.toDateString() === today;
    }).length;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const overdue = todos.filter(t => {
      if (!t.dueDate || t.completed) return false;
      const due = new Date(t.dueDate);
      return due < now;
    }).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, todayCompleted, highPriority, overdue, completionRate };
  }, [todos]);

  // Filtered todos
  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q));
    }

    if (categoryFilter !== 'All') {
      result = result.filter(t => t.category === categoryFilter);
    }

    if (priorityFilter !== 'All') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    return result;
  }, [todos, search, categoryFilter, priorityFilter]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Add todo
  const addTodo = async (todoData) => {
    try {
      const res = await axios.post(API_URL, todoData);
      setTodos(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // Toggle todo
  const toggleTodo = async (id, currentStatus) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { completed: !currentStatus });
      setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  // Add subtask
  const addSubtask = async (todoId, subtaskTitle) => {
    try {
      const todo = todos.find(t => t._id === todoId);
      const newSubtasks = [...(todo.subtasks || []), { title: subtaskTitle, completed: false }];
      const res = await axios.put(`${API_URL}/${todoId}`, { subtasks: newSubtasks });
      setTodos(prev => prev.map(t => (t._id === todoId ? res.data : t)));
    } catch (err) {
      console.error('Error adding subtask:', err);
    }
  };

  // Toggle subtask
  const toggleSubtask = async (todoId, subtaskIndex) => {
    try {
      const todo = todos.find(t => t._id === todoId);
      const newSubtasks = todo.subtasks.map((st, idx) =>
        idx === subtaskIndex ? { ...st, completed: !st.completed } : st
      );
      const res = await axios.put(`${API_URL}/${todoId}`, { subtasks: newSubtasks });
      setTodos(prev => prev.map(t => (t._id === todoId ? res.data : t)));
    } catch (err) {
      console.error('Error toggling subtask:', err);
    }
  };

  // Drag and drop reorder
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(filteredTodos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    // Update local state with new order
    const newTodos = todos.map(t => {
      const idx = items.findIndex(i => i._id === t._id);
      if (idx !== -1) {
        return { ...t, order: idx };
      }
      return t;
    });
    setTodos(newTodos);

    // Send bulk reorder to backend
    try {
      const reorderItems = items.map((item, index) => ({ id: item._id, order: index }));
      await axios.put(`${API_URL}/reorder/bulk`, { items: reorderItems });
    } catch (err) {
      console.error('Error reordering todos:', err);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">TaskMaster</h1>
          <div className="header-actions">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        <ProgressTracker stats={stats} />

        <div className="glass-card">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        </div>

        <div className="glass-card">
          <AddTodo onAdd={addTodo} />
        </div>

        <div className="glass-card">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <AnimatePresence mode="popLayout">
              <TodoList
                key={`${categoryFilter}-${priorityFilter}-${search}`}
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onAddSubtask={addSubtask}
                onToggleSubtask={toggleSubtask}
                onDragEnd={handleDragEnd}
              />
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

