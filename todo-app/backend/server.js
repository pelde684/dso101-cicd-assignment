const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Get PORT from environment variables (Required for Step 0)
const PORT = process.env.PORT || 5000;

// Simple To-Do Array (Initial Data)
let todos = [{ id: 1, task: "Install App", completed: false }];

// 2. ADD THIS: Root Route (Fixes "Cannot GET /")
// This is also used by Render.com to check if your app is alive
app.get('/', (req, res) => {
    res.send('Backend API is running successfully!');
});

// 3. API Routes
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    if (!req.body.task) {
        return res.status(400).json({ error: "Task content is required" });
    }
    const newTodo = { 
        id: Date.now(), 
        task: req.body.task, 
        completed: false 
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});