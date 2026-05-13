import "./FilterList.css"
import {useContext} from "react"
import {GlobalContext} from "../../context/ContainContext.jsx"

export default function FilterList(){
    const {filter,setFilter,category} =useContext(GlobalContext)
    return(
        <div id="filterList">
            <div>
                <select
                    id="catergory"
                    onChange={(e)=>{setFilter(e.target.value)}}
                    value={filter}
                >
                    <option value="">--Chọn--</option>
                    {category.map((item,index)=>(<option key={index} value={`${item}`} >{item.toUpperCase()}</option>))}
                </select>
            </div>
            
        </div>
    )
}


