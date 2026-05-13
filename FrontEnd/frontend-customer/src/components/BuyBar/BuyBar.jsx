import "./BuyBar.css"
import {useContext} from "react"
import {GlobalContext} from "../../context/ContainContext.jsx"
import PaymentModal from "../../components/PaymentMethod/PaymentModal.jsx"

const BuyBar=({product})=>{
    const {setStorage,setShow}=useContext(GlobalContext)
    const addCart=(product)=>{
        setStorage((prev)=>{
            const index=prev.findIndex((item)=>item.id===product.id)

            if(index!=-1){
                return prev.map((item,i)=>i===index?{...item,quantity:item.quantity+1}:item)
            }else{
                return [...prev,{...product,quantity:1}]
            }
        })
    }

    return (
        <div id="containerBuyBar">
            <ul className="listBuyBar">
               <li className="Voucher">Voucher</li>
               <li className="AddToCart" onClick={()=>{addCart(product)}}>Add to Cart</li>
               <li className="BuyPd" onClick={()=>setShow(true)}>Buy</li>
            </ul>
        </div>
    )

}

export default BuyBar;
