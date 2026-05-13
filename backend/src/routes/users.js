const userRouter=require("express").Router()
const User=require("../models/User.js")

userRouter.get('/',async (req,res)=>{
    try{
        const users=await User.find()
        res.json(users);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
userRouter.post('/signup',async (req,res)=>{
    try{
        const newUser=new User(req.body)
        await newUser.save();
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
userRouter.put('/',(req,res)=>{
    return res.status(200).json({method:"Put",message:"Put method"})
})
userRouter.patch('/',(req,res)=>{
    return res.status(200).json({method:"Patch",message:"Patch method"})
})
userRouter.delete('/',(req,res)=>{
    return res.status(200).json({method:"Delete",message:"Delete method"})
})

module.exports=userRouter
