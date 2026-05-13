import {useState,useRef} from "react";
import {GlobalContext} from './ContainContext'
import {GoogleAuthProvider} from "firebase/auth"

export const ProductProvider=({children})=>{
  const [dataSet, setDataSet] = useState([]);
  const [visible,setVisible]=useState(false)
  const [storage,setStorage]=useState([])
  const [dataUsers,setDataUsers]=useState([])
  const provider =new GoogleAuthProvider()
  const [authorize,setAuthorize]=useState(null)
  const [infoItem,setInfoItem]=useState(null)
  const [show,setShow]=useState(false)
  const [login,setLogin]=useState({
    username:"",
    password:""
  })
  const [signup,setSignup]=useState({
    fullname:"",
    username:"",
    password:"",
    passwordCF:"",
    email:"",
    phone:""
  })
  const [nameFind,setNameFind]=useState('')
  const [filterPd,setFilterPd]=useState([])
  const [filter,setFilter]=useState('')
  const cartRef=useRef()
  const [category,setCategory]=useState([])
  const [find,setFind]=useState('')

  return(
    <GlobalContext.Provider value={{find,setFind,category,setCategory,filter,setFilter,dataSet, setDataSet,visible,setVisible,storage,setStorage,provider,authorize,setAuthorize,cartRef,infoItem,setInfoItem,dataUsers,setDataUsers,show,setShow,login,setLogin,signup,setSignup,filterPd,setFilterPd,nameFind,setNameFind}}>
        {children}
    </GlobalContext.Provider>
  )
}

