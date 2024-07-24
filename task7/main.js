const express = require("express");
const instant = express();
const mongoose = require("mongoose");
const router = require("./router");
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(process.env.DB)

  .then(() => {
    console.log("db is connected");
  })

  .catch(() => {
    console.log("db is not connected");
  });

instant.use(express.json());
instant.use("/api", router);

instant.use((err, req, res, next) => {
  errstatus = err.status || 500;
  errmessage = err.message || "something went worng";

  return res.status(errstatus).json({ msg: errmessage, status: errstatus });
});

instant.listen(process.env.PORT, () => {
  console.log(`port number:${process.env.PORT}`);
});
