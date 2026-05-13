import "./Carousel.css"
import {useState} from 'react'
import left_arrow from "../../assets/left_arrow.png"
import right_arrow from "../../assets/right_arrow.png"
import iconArrowReadMore from "../../assets/image.png"
const Carousel=()=>{
    const [currentIndex,setCurrentIndex]=useState(0)
    const Pics=[
        'https://thuthuattienich.com/wp-content/uploads/2017/06/anh-dai-dien-facebook-cho-meo-de-thuong-27.jpg',
        'https://img4.thuthuatphanmem.vn/uploads/2020/03/18/anh-cho-meo-de-thuong_022907571.jpg',
        'https://inkythuatso.com/uploads/thumbnails/800/2023/02/meme-cho-meo-cute-3-03-11-27-39.jpg',
        'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg',
        'https://s.meta.com.vn/img/thumb.ashx/Data/image/2021/09/22/anh-cho-meo-13.jpg',
        'https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg'
    ]
    let prev=(currentIndex-1+Pics.length)%Pics.length
    let aft=(currentIndex+1)%Pics.length
    
    const handleClickCarousel=(orientation)=>{
        if(orientation==="right"){
            setCurrentIndex((prevIndex)=>(prevIndex+1)%Pics.length)
        }else if(orientation==="left"){
            setCurrentIndex((prevIndex)=>(prevIndex-1+Pics.length)%Pics.length)
        }
    }

    return(
        <div id="carouContainer">
            {Pics?<div>
                    <ul id="listPic">
                        <li>
                            <img className="pic" src={Pics[prev]} alt={`Slide ${prev}`}/>
                        </li>
                        <li id="picCenter">
                            <img className="pic main" src={Pics[currentIndex]} alt={`Slide ${currentIndex}`}/>
                            <div id="infoPic">
                                <p id="info">lorem fdsdf sdfsg</p>
                                <button id="moreInfoBtn">Read More <div id="iconArrow"><img src={iconArrowReadMore}/></div></button>
                            </div>
                        </li>
                        <li>
                            <img className="pic" src={Pics[aft]} alt={`Slide ${aft}`}/>
                        </li>
                    </ul>
                    <div>
                        <div className="btnRight" onClick={()=>{handleClickCarousel('right')}}><img className="iconArr" src={right_arrow} alt='right-arrow'/></div>
                        <div className="btnLeft" onClick={()=>{handleClickCarousel('left')}}><img className="iconArr" src={left_arrow} alt='left-arrow'/></div>
                    </div>
                </div>:<h1>Loading...</h1>}
        </div>
    )
}

export default Carousel;
