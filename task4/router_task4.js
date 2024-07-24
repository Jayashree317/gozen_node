const express = require('express');
const router = express.Router();

// Define routes
router.get('/read', (req, res) => {
  res.send('List of users');
});

router.get('/read/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Details of user ${userId}`);
});

router.post('/create', (req, res) => {
  res.send('Create a new user');
});

router.put('/update/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Update user ${userId}`);
});

router.delete('/delete/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Delete user ${userId}`);
});

module.exports = router;