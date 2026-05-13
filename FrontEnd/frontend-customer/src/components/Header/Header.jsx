import "./Header.css"
import {GlobalContext} from "../../context/ContainContext.jsx"
import {useContext} from 'react'

const Header=()=>{
    const {visible}=useContext(GlobalContext)
    return(
        <div id="headerContainer" style={{opacity:(visible?0:1),zIndex:3}}>
            <h1>LeoD Store</h1>
        </div>
    )
}

export default Header;
