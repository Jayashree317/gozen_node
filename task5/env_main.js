const express = require("express");
const instant = express();
const mongoose = require("mongoose");
const router = require("./env_router");
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

instant.listen(process.env.PORT, () => {
  console.log(`port number:${process.env.PORT}`);
});
