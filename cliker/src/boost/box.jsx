import { useEffect, useState } from 'react'
import moneta from '../assets/moneta.png'
import axios from 'axios'


const Box = ({data, clikerOn})=>{

    const [count, setCount] = useState(data.cliker_box)
    const tg = window.Telegram.WebApp
    const tgId = tg.initDataUnsafe?.user?.id

    useEffect(()=>{
        const fetch = async(data)=>{
            await setCount(data.cliker_box)
        }
        fetch(data)
    }, [data])
    const Recovery = ()=>{
        if( Number(count) < Number(data.cliker_box_max)){
            setCount(Number(count) + Number(data.recover))
            // postRecover()
        }}
    
      useEffect(()=>{
        const timeoutId = 
        setTimeout(
          Recovery
        , 2000);
        return async() => await clearTimeout(timeoutId);
      }, [count])

      const PostCliker = ()=>{
        const fetch = async()=>{
            await axios.post(`http://coinbackend.online/getCliker/${tgId}/`, {})
        }
        fetch()
      }

      const CheckingClikerBox = ()=>{
        if(Number(count) >= Number(data.cliker_box_max)){
            try{
                PostCliker()
                setCount(0)
            }
            catch(error){
                console.log(error)
            }
        }
      }

    if(clikerOn == true){
        return(
        <div className="boostt">
            <div className="icon-boost" style={{backgroundImage: `url(${moneta})`}}></div>
            <div className="collect">{count}/{data.cliker_box_max}</div>
            <button className="BoostBuy" onClick={()=>CheckingClikerBox()}>{"♻︎"}</button>
        </div>
        )
    }

}
export default Box