import './App.css'
import HomePage from "./pages/HomePage/HomePage.jsx"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import ScrollToTop from "./components/ScrollTopBtn/ScrollTopBt.jsx"
import {ProductProvider} from "./context/ProductContext.jsx"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Cart from "./components/Cart/Cart.jsx"
import LoginPage from "./pages/LoginSignupPage/LoginPage.jsx"
import SignupPage from "./pages/LoginSignupPage/SignupPage.jsx"
import InfoItem from "./pages/InfoItem/InfoItem.jsx"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'

function App() {
  const PUBLICKEY=import.meta.env.VITE_PublishableKey
  const stripePromise=loadStripe(PUBLICKEY)


  return (
    <ProductProvider>
      <Elements stripe={stripePromise}>
      <div id="parentContainer">
      <Header />
      <Router>
      <Routes>
      <Route path={"/"} element={<HomePage/>} />
      <Route path={"/cart"} element={<Cart/>} />  
      <Route path={"/Login"} element={<LoginPage />}/>
      <Route path={"/Signup"} element={<SignupPage />}/>
      <Route path={"/Info"} element={<InfoItem/>}/>
      </Routes>
      </Router>
      <ScrollToTop />
      <Footer />
      </div>
      </Elements>
    </ProductProvider>
  )
}

export default App
