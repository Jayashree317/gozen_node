const express = require("express");
const mongoose = require("mongoose");
const data = require("./main_schema");

const instant = express();
instant.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/db_crud")

  .then(() => {
    console.log("db is connected");
  })

  .catch(() => {
    console.log("db is not connected");
  });

instant.get("/read", async (req, res) => {
  const find_data = await data.find();

  res.json(find_data);
});

instant.post("/create", async (req, res) => {
  const create_data = new data({
    name: req.body.name,
    role: req.body.role,
    course: req.body.course,
    age: req.body.age,
    technologies: req.body.technologies,
  });

  const save_data = await create_data.save();
  res.json({ save_data, msg: "created" });
});

instant.put("/update/:id", async (req, res) => {
  const update_data = await data.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.json({ update_data, msg: "updated" });
});

instant.delete("/delete/:id", async (req, res) => {
  const delete_data = await data.findByIdAndDelete(req.params.id);

  res.json({ delete_data, msg: "deleted" });
});
instant.listen(2000, () => {
  console.log("server is running");
});
