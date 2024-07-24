const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('./file2'); // Your user model

const app = express();
app.use(express.json());

// Validation middleware
const validateUser = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  body('role').isString().trim().notEmpty().withMessage('Role is required'),
  body('course').isString().trim().notEmpty().withMessage('Course is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// POST route
app.post('/users', validateUser, handleValidationErrors, async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
