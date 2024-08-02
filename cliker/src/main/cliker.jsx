
import { useEffect, useState, useRef } from 'react'
import coinBlack from '../assets/Frame 2.png'
import Blackoin from '../assets/Blackoin.png'
import Menu from "./menu"
import Header from './header'
import '../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TypeOfCup from './cuppng'
import IsLoading from '../loading/IsLoading'

const Cliker = ({data, isLoading, setIsLoading})=>{
    
  const [count, setCount] = useState(data.count)
  const [balance, setBalance] = useState(data.balance)
  const [click, setClick] = useState(false)
  const [quantity, setQuantity] = useState(Number(data.storage))
  const [lastClick, setLastClick] = useState(Date.now());
  const [point, setPoint] = useState([])
  const recover = data.recover
  const tab = data.tab

  const max = data.max_storage

  const coinRef = useRef(null);
  
  const tg = window.Telegram.WebApp
  const tgId = tg.initDataUnsafe?.user?.id


  const upload = ()=>{
    const fetch = async()=>{
      await axios.post(`http://coinbackend.online/setcount/${tgId}/`, {"data":true})
    }
    fetch()
  }

  const postRecover = ()=>{
    const fetchRecover = async()=>{
      await axios.post(`http://coinbackend.online/setrecover/${tgId}/`, {"data":true})
    }
    fetchRecover()
  }

  useEffect(()=>{
    const fetch = async(data) =>{
        await setCount(data.count)
        await setQuantity(data.storage)
        await setBalance(data.balance)
        await setQuantity(Number(data.storage))
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
    if(Number(quantity) - Number(tab) >= 0){
      await setQuantity(Number(quantity) - Number(data.tab))
      await setCount(Number(count)+ Number(data.tab))
      await setBalance(Number(balance) + Number(data.tab))
      upload()
      Scale(el)
            setTimeout(() => {
              setClick(false)
              el.target.style.transform = "scale(1)"
            }, 300);
    }
  }

  const Recovery = ()=>{
    if( Number(quantity) < Number(max)){
        setQuantity(quantity => Math.min(Number(quantity) + Number(recover), Number(max)))
        // postRecover()
    }}

  useEffect(()=>{
    const timeoutId = 
    setTimeout(
      Recovery
    , 1000);
    return async() => await clearTimeout(timeoutId);
  }, [quantity])

  if(isLoading) return (<IsLoading />)
  
   return (
    <div className="main-block">

      <div className="block-blur"><div className="blur"></div></div>

      <Header data={data}/>

      <div className="reting-block">
        <div className="level"><Link className="LinkToRat" to="/ratings/">{<TypeOfCup el={data.rating} />} {data.rating}{">"}</Link></div>
        <div className="bar"><input value={count} type="range" name="" id="" max={data.point}/></div>
        <div className="count-balance"><p>{balance}</p></div>
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
        </div>
        <div className="counter"><ion-icon  className="flash" name="flash"></ion-icon>{quantity}/{max}</div>
      </div>
      <div className="block-opacity"></div>
        <Menu />
        
    </div>
  )
}
export default Cliker