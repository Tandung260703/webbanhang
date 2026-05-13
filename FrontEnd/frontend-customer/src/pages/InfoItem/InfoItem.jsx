import "./InfoItem.css";
import Card from "../../components/Card/Card.jsx"
import BuyBar from "../../components/BuyBar/BuyBar.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import PaymentModal from "../../components/PaymentMethod/PaymentModal.jsx";
import {useContext} from "react"
import { GlobalContext } from "../../context/ContainContext.jsx";


const InfoItem = () => {
  const {show,setShow}=useContext(GlobalContext)
  let product=JSON.parse(sessionStorage.getItem("product")) || JSON.parse(sessionStorage.getItem("item"))

  if(product.length>1){
    product=product.slice(product.length-2,product.length-1)
  }
  return (
    <>
      {product?
        <div id="renderContainer">
        <Navbar />
        {show? <div style={{margin:"20px"}}>
          <PaymentModal product={product} onClose={()=>setShow(false)}/>
          </div>:
          <div>
          <Card product={product} variant={'infoRender'}/>
          <BuyBar product={product}/>
          </div>
          }
        </div>        
        :<h1>Không tìm thấy sản phẩm</h1>
      }
    </>
  );
};

export default InfoItem;
