const express = require("express");
const app = express();

function requestLogger(req, res, next) {
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Method: ${req.method}`);
  next(); // Call the next middleware or route handler
}

// Use the custom middleware
app.use(requestLogger);

// Middleware to parse JSON bodies
app.use(express.json());

// GET route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// POST route
app.post("/data", (req, res) => {
  const data = req.body;
  res.send(`Received data: ${JSON.stringify(data)}`);
});

// Start the server
app.listen(3500, () => {
  console.log("Server is 3500");
});
