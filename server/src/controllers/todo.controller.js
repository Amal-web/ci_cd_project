import {prisma} from '../config/db.config.js';

// Create new todo
export const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await prisma.todo.create({ data: { title } });
    res.status(201).json(todo);
  } catch (error) {
    console.error("❌ Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
  
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title, completed },
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({ where: { id: Number(id) } });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
