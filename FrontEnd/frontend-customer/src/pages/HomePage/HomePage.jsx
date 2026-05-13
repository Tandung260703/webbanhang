import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Carousel from "../../components/Carousel/Carousel.jsx";
import Promotions from "../../components/Promotions/Promotions.jsx";
import ProductList from "../../components/ProductList/ProductList.jsx";
import FilterList from "../../components/FilterList/FilterList.jsx"
import { useContext } from "react";
import { GlobalContext } from "../../context/ContainContext.jsx";
import { useEffect } from "react";

const HomePage = () => {
  const { setDataSet,setCategory} = useContext(GlobalContext);

  const getData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    
    const categories = [...new Set(data.products.map(item => item.category))]
    setCategory(categories);

    const uniqueProducts = Array.from(
     new Map(data.products.map(item => [item.id, item])).values()
    );

    const updateData=uniqueProducts.map((product)=>({...product,quantity:0,discount:0,member:""}))
    console.log(updateData)
    setDataSet((prev) => [...prev, ...updateData]);
  };

  useEffect(() => {
    getData();
  }, []);
  // Data source: https://dummyjson.com/docs/products

  return (
    <div id="container" >
      <Navbar />
      <Carousel />
      <Promotions />
      <FilterList/>
      <ProductList />
    </div>
  );
};

export default HomePage;
