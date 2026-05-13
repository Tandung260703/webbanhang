import "./Card.css";
import iconArrow from "../../assets/image.png";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/ContainContext.jsx";
import {useNavigate} from "react-router-dom"
import CartFlyEffect from "../CartFlyEffect/CartFlyEffect.jsx";

const Card = ({ variant, product }) => {
  const [flyer, setFlyer] = useState(null);
  const { setStorage, cartRef } = useContext(GlobalContext);
  // console.log(storage)
  const imgRef = useRef();
  const navigate=useNavigate()

  if (!product) return null;

  const addCart = (product) => {
    setStorage((prev) => {
      const index = prev.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        // Tạo mảng mới và object mới
        return prev.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Thêm sản phẩm mới, gán quantity = 1 nếu chưa có
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleAdd = () => {
    const start = imgRef.current.getBoundingClientRect();
    const end = cartRef.current.getBoundingClientRect();

    setFlyer({
      startPos: start,
      endPos: end,
      image: product.thumbnail,
    });
  };

  const getItem=(product)=>{
    sessionStorage.setItem("product",JSON.stringify(product))
    navigate('/Info')
  }

  return (
    <div className={`cardContainer ${variant} style1`}>
      <div className="picProduct" onClick={()=>{getItem(product)}}>
        <img ref={imgRef} src={product.thumbnail} alt="image product" />
      </div>
      <div className="infoProduct">
        <div className="nameProduct left" onClick={()=>{getItem(product)}}>{product.title}</div>
        <div className="Price&Buy right">
          <div className="price">{product.price}$</div>
          <div
            className="addCart"
            onClick={() => {
              addCart(product);
              handleAdd();
            }}
          >
            add to cart <img src={iconArrow} alt="arrow to right" />
          </div>
        </div>
        <div className="paragraph footer" onClick={()=>{getItem(product)}}>{product.description}</div>
      </div>
      {flyer && (
        <CartFlyEffect
          startPos={flyer.startPos}
          endPos={flyer.endPos}
          image={flyer.image}
          onDone={() => setFlyer(null)}
        />
      )}
    </div>
  );
};

export default Card;
