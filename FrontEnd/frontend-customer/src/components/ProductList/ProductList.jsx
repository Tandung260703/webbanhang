import "./ProductList.css";
import Card from "../Card/Card.jsx";
import {GlobalContext} from "../../context/ContainContext.jsx"
import {useContext} from "react"

const ProductList = () => {
  const {dataSet,filter,find}=useContext(GlobalContext)
  return (
    <div id="itemsContainer">
      {filter||find?<>
        {dataSet.includes(filter)||dataSet.includes(find)?(<>
      <ul className="listProduct">{
          dataSet.filter((item) => (
            (!find||item.title.toLowerCase().slice(0,find.length)==find.toLowerCase()) && (!filter||item.category==filter)
          )).map((product,index)=>(
              <li key={index} className="productItem">
                <Card product={product} />
              </li>
          ))}
        </ul>:
        </>):<h1>Can't find out this product</h1>      
      }</>:
        <>
      {dataSet.length > 0 ? (
        <ul className="listProduct">{
          dataSet.map((product, index) => (
          <li key={index} className="productItem">
            <Card product={product} />
          </li>
          ))}
        </ul>
      ): (
        <h1>Loading...</h1>
      )}
       </>
      }
    </div>
  );
};

export default ProductList;
