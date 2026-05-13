import "./ScrollTopBtn.css"
import iconArrow from "../../assets/upArrow.png"
import {useContext,useEffect} from 'react'
import {GlobalContext} from "../../context/ContainContext.jsx"

const ScrollTopBtn=()=>{
    const {visible,setVisible}=useContext(GlobalContext)
    const styleBtnScrollTop={
        opacity:visible?"1":"0",
    }

    useEffect(()=>{
        const handleScroll=()=>{

            if(window.scrollY>5){
                setVisible(true)
            }else{
                setVisible(false)
            }
        }

        window.addEventListener("scroll",handleScroll)
        return ()=>window.removeEventListener("scroll",handleScroll)
    },[])
    
    const ScrollToTop=()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    }

    return(
        <div id="scrollTopBtn" style={styleBtnScrollTop} onClick={ScrollToTop}>
            <div id="paddingOuline">
                <img src={iconArrow} alt="ScrollTop Icon"/>
            </div>
        </div>
    )
}

export default ScrollTopBtn;

