const express = require("express");
const mongoose = require("mongoose");
const data = require("./schema");

const instant = express();

mongoose
  .connect("mongodb://localhost:27017/async_db")
  .then(() => {
    console.log("db is connected");
  })
  .catch(() => {
    console.log("db is not connected");
  });

instant.use(express.json());

instant.get("/read", async (req, res) => {
  try {
    const find_data = await data.find();
    res.json(find_data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
});


instant.post("/create", async (req, res) => {
    try {
      const create_data = new data({
        name: req.body.name,
        role: req.body.role,
        course: req.body.course,
        age: req.body.age,
      });
  
      const save_data = await create_data.save();
      res.json({ save_data, msg: "created" });
    } catch (error) {
      res.status(500).json({ message: "Error creating data", error: error.message });
    }
  });

  
  instant.put("/update/:id", async (req, res) => {
    try {
      const update_data = await data.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      res.json({ update_data, msg: "updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data", error: error.message });
    }
  });

  
  instant.delete("/delete/:id", async (req, res) => {
    try {
      const delete_data = await data.findByIdAndDelete(req.params.id);
      res.json({ delete_data, msg: "deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data", error: error.message });
    }
  });
  

  instant.listen(2500, () => {
    console.log("server is running");
  });