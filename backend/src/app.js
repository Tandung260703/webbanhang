const express=require("express")
const morgan=require('morgan')
const app=express()
const router=require('./routes/router.js')
const cors=require("cors")
const mongoose=require("mongoose")

mongoose.connect('mongodb://localhost:27017/users')
.then(()=>console.log("Connected!"))
.catch(err=>console.error("Connect error:",err))

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use('/api',router)


module.exports=app
