import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState(""); // State for the input field
  const API_URL = process.env.REACT_APP_API_URL;

  // READ: Fetch todos on load
  useEffect(() => {
    if (API_URL) {
      axios.get(`${API_URL}/api/todos`)
        .then(res => setTodos(res.data))
        .catch(err => console.error("Error fetching todos:", err));
    }
  }, [API_URL]);

  // CREATE: Send new todo to backend
  const handleAddTodo = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!task) return;

    try {
      const res = await axios.post(`${API_URL}/api/todos`, { task });
      setTodos([...todos, res.data]); // Update UI with new item
      setTask(""); // Clear input
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>My To-Do List</h1>
      
      {/* ADD SECTION */}
      <form onSubmit={handleAddTodo}>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter a task..." 
        />
        <button type="submit">Add Task</button>
      </form>

      {/* LIST SECTION */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>

      {!API_URL && <p style={{color: 'red'}}>Check your .env file! API_URL is missing.</p>}
    </div>
  );
}

export default App;