const express=require("express");
const { Get_data, Post_data,Login, put_data, del_data} = require("./env_fn");

const router=express.Router()

router.get("/read",Get_data);
router.post("/create",Post_data);
router.post("/login",Login);
router.put("/update/:id",put_data)
router.delete("/delete/:id",del_data)

module.exports=router;