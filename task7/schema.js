const mongoose=require("mongoose")

const data_login=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },

        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        }
    }
)

module.exports=mongoose.model("envcollection",data_login)