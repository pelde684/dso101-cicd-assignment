const express = require('express');
const cors = require('cors');
const path = require('path');  // ← IMPORTANT: Add this line
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ← IMPORTANT: This line serves your HTML, CSS, and JS files
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 5000;

// Store todos (in memory - resets on restart)
let todos = [];

// API Routes
app.get('/api/todos', (req, res) => {
    console.log('GET /api/todos - Returning:', todos);
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    console.log('POST /api/todos - Received:', req.body);
    
    const task = req.body.task || req.body.title;
    
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    
    const newTodo = {
        id: Date.now(),
        task: task,
        completed: false
    };
    
    todos.push(newTodo);
    console.log('Added todo:', newTodo);
    res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const beforeCount = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    
    if (beforeCount !== todos.length) {
        console.log('Deleted todo with id:', id);
        res.json({ message: 'Deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// ← IMPORTANT: This serves the HTML file when someone visits /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📱 Frontend available at: http://localhost:${PORT}`);
});