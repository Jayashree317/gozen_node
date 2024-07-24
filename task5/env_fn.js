const data_login = require("./env_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Get_data = async (req, res) => {
  let find_data = await data_login.find();
  res.json(find_data);
};

const Post_data = async (req, res) => {
  let haspassword = await bcrypt.hash(req.body.password, 7);
  const create_data = new data_login({
    ...req.body,
    password: haspassword,
  });

  const email = await data_login.findOne({ email: req.body.email });
  if (email) return res.status("404").json("email already registered");
  const save_data = await create_data.save();
  res.json({ save_data, msg: "created" });
};

const put_data = async (req, res) => {
  const update_data = await data_login.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.json(update_data);
};

const del_data = async (req, res) => {
  const delete_data = await data_login.findByIdAndDelete(req.params.id);
  res.json(delete_data);
};

const Login = async (req, res) => {
  const useremail = await data_login.findOne({ email: req.body.email });
  if (!useremail) return res.status("400").json("email not valid");

  const userpassword = await bcrypt.compare(
    req.body.password,
    useremail.password
  );

  if (!userpassword) return res.status("400").json("password not valid");

  let jwt_token = await jwt.sign({ id: useremail.id }, process.env.TOKEN);
  res.json({ token: jwt_token });
};

module.exports={Get_data,Post_data,put_data,del_data ,Login}
