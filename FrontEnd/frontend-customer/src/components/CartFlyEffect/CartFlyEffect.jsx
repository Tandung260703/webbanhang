import {motion} from "framer-motion"
import {useEffect,useState} from "react"

const CartFlyEffect=({startPos,endPos,image,onDone})=>{
    const [action,setAction]=useState(true)

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setAction(false);
            onDone?.();
        },700);
        return ()=>clearTimeout(timer)
    },[])

    if(!action) return null;

    return (
        <motion.img
            src={image}
            initial={{
                position:"fixed",
                top:startPos.top,
                left:startPos.left,
                width:80,
                height:80,
                borderRadius:10,
                zIndex:9999,
            }}
            animate={{
                top:endPos.top,
                left:endPos.left,
                width:20,
                height:20,
                opacity:0.5,
                rotate:360,
            }}
            transition={{duration:2.0,ease:"easeInOut"}}
        />
    )
}

export default CartFlyEffect
