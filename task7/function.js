const datas = require("./schema");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const errhandling = require("./error");

const Get_data = async (req, res, next) => {
    try {
      const find_data = await datas.find();
      res.json(find_data);
    } catch (error) {
      console.error('Error in Get_data:', error.message); // Print error message to console
      next(errhandling(500, 'Failed to fetch data')); // Pass error to error handling middleware
    }
  };

const Post_data = async (req, res,next) => {
  let haspassword = await bcrypt.hash(req.body.password, 7);
  const create_data = new datas({
    ...req.body,
    password: haspassword,
  });

  const email = await datas.findOne({ email: req.body.email });
  // if (email) return res.status("404").json("email already registered");
if (email) return next(errhandling("",""))
  const save_data = await create_data.save()
  res.json({ save_data, msg: "created" });
};


const put_data=async(req,res)=>{
  const update_data=await schema_data.findByIdAndUpdate(
      req.params.id,
      {$set:req.body},
      {new:true}
  )

  res.json(update_data)
}

const del_data=async(req,res)=>{
  const delete_data=await schema_data.findByIdAndDelete(
      req.params.id
  )
  res.json(delete_data)
}

const Login=async(req,res)=>{
    const useremail=await datas.findOne({email:req.body.email});
    if (!useremail) return res.status("400").json("email not valid");

const userpassword=await bcrypt.compare(
    req.body.password,
    useremail.password
);

if (!userpassword) return res.status("400").json("password not valid");
// res.json("login successfully")
let jwt_token=await jwt.sign({id:useremail.id},process.env.TOKEN)
res.json({token:jwt_token})
}

module.exports={Get_data,Post_data,put_data,del_data ,Login}