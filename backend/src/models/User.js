const mongoose =require("mongoose")

const userSchema=new mongoose.Schema({
    fullname:String,
    username:String,
    password:String,
    email:String,
    phone:String
    
},{timestamps:true})

module.exports= mongoose.model("User",userSchema);





