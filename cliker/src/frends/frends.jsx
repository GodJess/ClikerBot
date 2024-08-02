import "./friends.css"
import '../App.css'
import Header from "../main/header"
import Menu from "../main/menu"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import friends from "../assets/Frends.png"
import IsLoading from "../loading/IsLoading"


const Friends = ()=>{

    const [data, setData] = useState({})
    const [referal, setReferal] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const tg = window.Telegram.WebApp
    const tgId = tg.initDataUnsafe?.user?.id

    useEffect(()=>{
        const fetchData = async()=>{
            try{
              const response = await axios.get(`http://coinbackend.online/user/${tgId}/`)
              setData(response.data)
              const answear = await axios.get(`http://coinbackend.online/referal/${tgId}/`)
              setReferal(answear.data)
              console.log(data)
              setIsLoading(false)
            }
            catch(error){
              console.log("У вас не идут данные с сервера:", error)
              setIsLoading(false)
            }
      
          }
          fetchData()
    }, [])

    const bonusForFriend = (el)=>{
        switch(el){
            case "Bronze":
                return "10000"
            case "Silver":
                return "25000"
            case "Gold":
                return "50000"
            case "Platina":
                return "100000"
            case "Diamond":
                return "250000"
        }
    }

    if(isLoading) return(<IsLoading />)
    else return(
        <div className="main-block">
        <div className="block-blur"><div className="blur"></div></div>
        <Header data={data} />
        <div className="block-leaders">
            <div className="leadersLogo">
                <div className="img-referals" style={{backgroundImage: `url(${friends})`}}></div>
                <p>Referals</p>
            </div>
        </div>
        <div className="listOfliaderss">
            {referal?.map((ref, i)=>{
                return(
                    <div className="examps" key={ref.id}>
                        <div className="number">{Number(i) + 1}</div>
                        <div className="username">{ref.tg_user_name}</div>
                        <div className="usercount">+ {bonusForFriend(ref.rating)}</div>
                    </div>
                )
            })}
        </div>
        
        <div className="block-learn">
        <div className="your-link">
            <p className="linkToreferal">t.me/dhbfsbfhsbfh2368bhb</p>
        </div>
        </div>
        
        <div className="block-learn">
            <Link className="WatchMore" to="" onClick="">Share your link</Link>
        </div>

        <Menu />
    </div>
    )
}

export default Friends