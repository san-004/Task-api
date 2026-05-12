const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password123') {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '1h' }
    );

    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = app;