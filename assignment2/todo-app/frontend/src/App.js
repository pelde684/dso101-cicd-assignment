import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      const response = await axios.post(`${API_URL}/api/todos`, {
        title,
        description
      });
      setTodos([response.data, ...todos]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/api/todos/${id}`, updatedData);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List Application</h1>
      
      <form onSubmit={createTodo} className="todo-form">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="desc-input"
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  defaultValue={todo.title}
                  onBlur={(e) => updateTodo(todo.id, { ...todo, title: e.target.value })}
                />
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="todo-content" onClick={() => setEditingId(todo.id)}>
                  <h3>{todo.title}</h3>
                  {todo.description && <p>{todo.description}</p>}
                </div>
                <div className="todo-actions">
                  <button onClick={() => updateTodo(todo.id, { ...todo, completed: !todo.completed })}>
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;