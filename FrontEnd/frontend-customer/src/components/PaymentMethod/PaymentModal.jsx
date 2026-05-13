 import PaymentForm from './PaymentForm.jsx'

export default function PaymentModal({product,onClose}){
    const amount=product.price

    const handleSuccess=(paymentIntent)=>{
        alert("Thanh toán thành công")
        console.log('PaymentIntent:',paymentIntent)
        onClose()
    }

    return(
        <div className="modal">
            <h2>Thanh Toán {product.name}</h2>
            <PaymentForm 
                amount={amount}
                onSuccess={handleSuccess}
                onClose={onClose}
            />
        </div>
    )
}



