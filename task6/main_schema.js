const mongoose = require("mongoose");

const data_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  technologies: {
    type: Array, 
    required: true,
  },
});
module.exports = mongoose.model("collection_db", data_schema);
