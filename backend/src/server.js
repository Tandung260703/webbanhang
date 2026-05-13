const app=require('./app.js')
const dotenv=require("dotenv")
const Stripe=require('stripe')

dotenv.config()

const stripe=Stripe(process.env.SecretKey)
PORT=process.env.PORT||""

app.post('/create-payment-intent',async(req,res)=>{
    try{
        const {amount}=req.body
        if(!amount) return res.status(400).json({error:"Missing amount"})
        
        const paymentIntent=await stripe.paymentIntents.create({
            amount:Math.round(amount*100),
            currency:"usd",
        })
        res.json({clientSecret:paymentIntent.client_secret})            
    }catch(err){
        console.error(err)
        return res.status(500).json({error:err.message})
    }
})



app.listen(PORT,()=>{
    console.log(`app is listen to: http://localhost:${PORT}`)
})

