import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDragEnd }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-message">
        <div className="empty-message-icon">
          <ClipboardList size={64} />
        </div>
        <div className="empty-message-text">No tasks found. Add one above!</div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <ul
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <AnimatePresence mode="popLayout">
              {todos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided, snapshot) => (
                    <TodoItem
                      todo={todo}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onAddSubtask={onAddSubtask}
                      onToggleSubtask={onToggleSubtask}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;

