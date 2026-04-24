import React, { useState, useRef } from 'react';
import { Plus, Mic, MicOff } from 'lucide-react';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Other');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const categories = ['Study', 'Work', 'Personal', 'Other'];
  const priorities = ['Low', 'Medium', 'High'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        category,
        priority,
        dueDate: dueDate || null
      });
      setTitle('');
      setCategory('Other');
      setPriority('Medium');
      setDueDate('');
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTitle(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-row">
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>{p} Priority</option>
          ))}
        </select>
        <input
          type="date"
          className="date-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          type="button"
          className={`voice-btn ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopVoiceInput : startVoiceInput}
          title={isListening ? 'Stop listening' : 'Voice input'}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button type="submit" className="add-btn">
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTodo;

