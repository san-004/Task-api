const express = require('express');
const router = express.Router();
const authenticateToken = require('../auth');

let tasks = [
    { id: 1, title: 'Prepare report', completed: false },
    { id: 2, title: 'Review code', completed: true }
];

/* GET /tasks */
router.get('/', authenticateToken, (req, res) => {
    res.json(tasks);
});

/* POST /tasks */
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