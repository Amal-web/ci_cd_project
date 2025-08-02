import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post(API_URL, { title });
      setTitle("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Toggle complete
  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border shadow rounded">
      <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                />
                <span
                  className={todo.completed ? "line-through text-gray-500" : ""}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
