const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 5000;

// Store todos
let todos = [];

// API Routes
app.get('/api/todos', (req, res) => {
    console.log('GET /api/todos - Returning:', todos);
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    console.log('POST /api/todos - Received body:', req.body);
    
    // Try multiple possible field names
    let task = req.body.task || req.body.title || req.body.todo || req.body.item;
    
    // If still no task, check if body is a string
    if (!task && typeof req.body === 'string') {
        try {
            const parsed = JSON.parse(req.body);
            task = parsed.task || parsed.title;
        } catch(e) {}
    }
    
    if (!task) {
        console.log('No task found in request. Body keys:', Object.keys(req.body));
        return res.status(400).json({ error: 'Task is required. Please send { "task": "your task" }' });
    }
    
    const newTodo = {
        id: Date.now(),
        task: task,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    console.log('✅ Added todo:', newTodo);
    console.log('📋 All todos:', todos);
    
    res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const beforeCount = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    const afterCount = todos.length;
    
    if (beforeCount !== afterCount) {
        console.log('🗑️ Deleted todo with id:', id);
        res.json({ message: 'Todo deleted successfully', id: id });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', todosCount: todos.length });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📱 Open your browser to: http://localhost:${PORT}`);
    console.log(`🧪 Test API: curl http://localhost:${PORT}/api/todos`);
});