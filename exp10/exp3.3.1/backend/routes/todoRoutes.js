const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos with optional search/filter
router.get('/', async (req, res) => {
  try {
    const { search, category, priority, completed } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (priority) {
      query.priority = priority;
    }
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    const todos = await Todo.find(query).sort({ order: 1, createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    category: req.body.category || 'Other',
    priority: req.body.priority || 'Medium',
    dueDate: req.body.dueDate || null,
    subtasks: req.body.subtasks || [],
    order: req.body.order || 0
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (req.body.title != null) todo.title = req.body.title;
    if (req.body.completed != null) todo.completed = req.body.completed;
    if (req.body.category != null) todo.category = req.body.category;
    if (req.body.priority != null) todo.priority = req.body.priority;
    if (req.body.dueDate != null) todo.dueDate = req.body.dueDate;
    if (req.body.order != null) todo.order = req.body.order;
    if (req.body.subtasks != null) todo.subtasks = req.body.subtasks;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await todo.deleteOne();
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REORDER todos (bulk update order)
router.put('/reorder/bulk', async (req, res) => {
  try {
    const { items } = req.body;
    const updatePromises = items.map(item =>
      Todo.findByIdAndUpdate(item.id, { order: item.order }, { new: true })
    );
    await Promise.all(updatePromises);
    res.json({ message: 'Reordered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET stats for progress tracking
router.get('/stats/summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const total = await Todo.countDocuments();
    const completed = await Todo.countDocuments({ completed: true });
    const todayCompleted = await Todo.countDocuments({
      completed: true,
      updatedAt: { $gte: today, $lt: tomorrow }
    });
    const highPriority = await Todo.countDocuments({ priority: 'High', completed: false });
    const overdue = await Todo.countDocuments({
      dueDate: { $lt: today },
      completed: false
    });

    res.json({
      total,
      completed,
      pending: total - completed,
      todayCompleted,
      highPriority,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

