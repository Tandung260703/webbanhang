import {useState} from "react"
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import axios from "axios"


export default function PaymentForm({amount,onSuccess,onClose}){

    const stripe =useStripe()
    const elements =useElements()
    const [loading, setLoading]=useState(false)
    const [error,setError]=useState(null)
    const PORT=import.meta.env.VITE_PORT

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError(null);
        if(!stripe||!elements) return; 

        setLoading(true)
        try{
            // 1) Gọi backend tạo PaymentIntent
            const resp=await axios.post(`http://localhost:4000/create-payment-intent`,{
                amount
            })
            console.log(resp.data)
            const clientSecret=resp.data.clientSecret

            // 2)confirm thẻ trên client bằng clientSecret
            const card=elements.getElement(CardElement)
            const result=await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card,
                    billing_details:{name:"Người mua"}
                }
            })

            if(result.error){
                setError(result.error.message)
            }else{
                if(result.paymentIntent && result.paymentIntent.status ==="succeeded"){
                    onSuccess(result.paymentIntent)
                }else{
                    setError("Thanh toán chưa hoàn tất.")
                }
            }
        }catch(err){
            setError(err.response?.data?.err||err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div style={{padding:10,border:"1px solid #ddd",borderRadius:6,width:"200px",marginTop:"10px"}}>
                <CardElement />
            </div>
            {error && <div style={{color:"red"}}>{error}</div>}
            <button type="submit" disabled={!stripe||loading}>
                {loading?"Đang xử lý...":`Thanh toán ${amount} $`}
            </button>
            <button type="button" onClick={onClose}>Hủy</button>
        </form>
    )

}


