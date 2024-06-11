
import { useEffect, useState, useRef } from 'react'
import coinBlack from '../assets/Frame 2.png'
import Blackoin from '../assets/Blackoin.png'
import Menu from "./menu"
import '../App.css'

const Cliker = ({data})=>{
    
  const [count, setCount] = useState(data.count)
  const [click, setClick] = useState(false)
  const [quantity, setQuantity] = useState(data.max)
  const [lastClick, setLastClick] = useState(Date.now());
  const [point, setPoint] = useState([])
  const tab = data.tab

  const max = data.max

  const coinRef = useRef(null);


  useEffect(()=>{
    const fetch = async(data) =>{
        await setCount(data.count)
        await setQuantity(data.max)
    }
    fetch(data)
  },[data])

  const addPoint = (e) => {
    const coinRect = e.currentTarget.getBoundingClientRect();

    const newPoint = {
      x: e.clientX- coinRect.left - (15 / 2), // центрируем по X
      y: e.clientY - coinRect.top - (15 / 2), 
    };
    setPoint([...point, newPoint]);
    setTimeout(() => setPoint(point => point.slice(1)), 1000);
  };

  const Scale =(el)=>{
    setClick(true)
    el.target.style.transform = "scale(1.1)"
  }
  const Reduse = async(el)=>{
    if(quantity > 0){
      await setQuantity(quantity - data.tab)
      await setCount(count+data.tab)
      Scale(el)
            setTimeout(() => {
              setClick(false)
              el.target.style.transform = "scale(1)"
            }, 300);
    }
  }

  const Recovery = ()=>{
    if( quantity < max){
        setQuantity(quantity => Math.min(quantity + data.recover, max))
    }}

  useEffect(()=>{
    if(Date.now() - lastClick >= 1000){
      Recovery;
    }
    const timeoutId = 
    setTimeout(Recovery, 1000);
    return async() => await clearTimeout(timeoutId);
  }, [quantity])

  if(!data) return console.log(" Что-то пошло не так")

  return (

    <div className="main-block">
      <div className="block-blur"><div className="blur"></div></div>

      <div className="header-block">
        <p className='pp'>X</p> 
        <div className="circle" style={{backgroundImage:`url(${data.img})`}}></div>
        </div>

      <div className="reting-block">
        <div className="level">{data.rating} {">"}</div>
        <div className="bar"><input value={count} type="range" name="" id="" max="10000"/></div>
        <div className="count-balance"><p>{count}</p></div>
      </div>
      <div  className="block-coin">
        <div className="blackoin" ref={coinRef} style={{
          backgroundImage: `url(${Blackoin})`
        }} onClick={

          async(el)=> { 
            await Reduse(el)
            await addPoint(el)
          }
        }>
            {point.map((points, index) => (
            <div
              key={index}
              className="point"
              style={{ marginLeft: `${points.x}px`, marginTop: `${points.y}px` }}
            >
              +{tab}
            </div>
          ))}
          
          </div>
        <div className="counter">{quantity}/{max}</div>
      </div>
      <div className="block-opacity"></div>
        <Menu />
    </div>
  )
}
export default Cliker