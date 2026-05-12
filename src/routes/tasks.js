const express = require('express');
const authenticateToken = require('../auth');

const router = express.Router();

let tasks = [
    { id: 1, title: 'Prepare report', completed: false},
    { id: 2, title: 'Review code', completed: true }
];

router.get('/', authenticateToken, (req, res) => {
    res.json(tasks);
});

router.post('/', authenticateToken, (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

module.exports = router;