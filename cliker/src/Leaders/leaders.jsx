import "./leaders.css"
import Header from "../main/header"
import Menu from "../main/menu"
import { Link } from "react-router-dom"
import LeadersPopup from "./leadersPopup"
import "../App.css"
import cup from "../assets/cup.png"
import IsLoading from "../loading/IsLoading"

import { useEffect, useState } from "react"
import axios from "axios"

const Leaders = ()=>{
    const [data, setData] = useState({})
    const [popup, setPopup] = useState(false)
    const [listOfUser, setListofUser] = useState([])
    const [listTop, setListTop] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const tg = window.Telegram.WebApp
    const tgId = tg.initDataUnsafe?.user?.id

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`http://coinbackend.online/user/${tgId}/`)
                setData(response.data)
                const answear = await axios.get("http://coinbackend.online/userList/")
                setListofUser(BubleSort(answear.data))
                setListTop(Top6(BubleSort(answear.data)))
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

    const Top6 = (mass)=>{
        var list = []
        for(var i = 0; Number(i) < 6; i++){
            list.push(mass[i])
        }
        return list
    }

    const BubleSort = (mass)=>{
        for(var i = 0; Number(i) < mass.length; i++){
            for(var j = Number(i) + 1; Number(j) < mass.length; j++){
                if(Number(mass[i].count) < Number(mass[j].count)){
                    let elem = mass[i];
                    mass[i] = mass[j]
                    mass[j] = elem
                }
            }
        }
        return mass
    }

    if(isLoading) return(<IsLoading />)
    return(
        <div className="main-block">
            <div className="block-blur"><div className="blur"></div></div>
            <Header data={data} />
            <div className="block-leaders">
                <div className="leadersLogo">
                    <div className="img-racket" style={{backgroundImage: `url(${cup})`}}></div>
                    <p>Leaders</p>
                </div>
            </div>
            <LeadersPopup popup={popup} setPopup={setPopup} list={listOfUser} />
            <div className="listOfliaders">
                {listTop?.map((element, index)=>{
                    return(
                    <div className="examp" key={element.id}>
                        <div className="number">{index + 1}</div>
                        <div className="username">{element.tg_user_name}</div>
                        <div className="usercount">{element.count}</div>
                    </div>
                    )
                })}
                <div className="yourplace-block">                    
                    <div className="yournumber">10000+</div>
                    <div className="yourname">You</div>
                    <div className="usercount">2100</div>
                </div>
            </div>
            <div className="block-learn">
                <Link className="WatchMore" to="" onClick={()=> setPopup(true)}>Learn more</Link>
            </div>

            <Menu />
        </div>
    )
}

export default Leaders