import React, { useState } from 'react';
import { GripVertical, Trash2, ListPlus, ChevronUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const TodoItem = ({ todo, onToggle, onDelete, onAddSubtask, onToggleSubtask, provided, snapshot }) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState('');

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (subtaskInput.trim()) {
      onAddSubtask(todo._id, subtaskInput.trim());
      setSubtaskInput('');
    }
  };

  const completedSubtasks = todo.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = todo.subtasks?.length || 0;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={`todo-item ${todo.completed ? 'completed-item' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
      style={{
        ...provided.draggableProps.style,
        boxShadow: snapshot.isDragging ? '0 12px 40px rgba(0,0,0,0.2)' : undefined
      }}
    >
      <div className="drag-handle" {...provided.dragHandleProps}>
        <GripVertical size={20} />
      </div>

      <div className="todo-checkbox-wrapper">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, todo.completed)}
        />
      </div>

      <div className="todo-content">
        <div className="todo-header-row">
          <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <span className={`badge badge-category-${todo.category?.toLowerCase()}`}>
            {todo.category}
          </span>
          <span className={`badge badge-priority-${todo.priority?.toLowerCase()}`}>
            {todo.priority}
          </span>
        </div>

        <div className="todo-meta">
          {todo.dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              <Calendar size={14} />
              {isOverdue ? 'Overdue: ' : 'Due: '}
              {formatDate(todo.dueDate)}
            </span>
          )}
          {totalSubtasks > 0 && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {completedSubtasks}/{totalSubtasks} subtasks
            </span>
          )}
        </div>

        {showSubtasks && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="subtasks-container"
          >
            {todo.subtasks?.map((subtask, idx) => (
              <div key={idx} className="subtask-item">
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => onToggleSubtask(todo._id, idx)}
                />
                <span className={subtask.completed ? 'completed' : ''}>{subtask.title}</span>
              </div>
            ))}
            <form onSubmit={handleAddSubtask} className="subtask-input-row">
              <input
                type="text"
                className="subtask-input"
                placeholder="Add a subtask..."
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
              />
              <button type="submit" className="subtask-add-btn">Add</button>
            </form>
          </motion.div>
        )}
      </div>

      <div className="todo-actions">
        <button
          className="icon-btn subtask-btn"
          onClick={() => setShowSubtasks(!showSubtasks)}
          title={showSubtasks ? 'Hide subtasks' : 'Show subtasks'}
        >
          {showSubtasks ? <ChevronUp size={16} /> : <ListPlus size={16} />}
        </button>
        <button
          className="icon-btn"
          onClick={() => onDelete(todo._id)}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.li>
  );
};

export default TodoItem;

