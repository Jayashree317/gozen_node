const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that each email is unique
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1, // Ensures age is a positive integer
  },
});

// Create the model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
