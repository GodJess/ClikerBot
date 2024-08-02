import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../main/header"
import Menu from "../main/menu"
import roket from "../assets/roket.png"
import MultyTab from "../assets/Vector.png"
import Bot from "../assets/Bot.png"
import Recover from "../assets/energyRecover.png"
import Limit from "../assets/LimitEnergy.png"
import "./boost.css"
import "../App.css"
import Modal from "../modalwindow/modal"
import moneta from '../assets/moneta.png'
import Box from "./box"
import IsLoading from "../loading/IsLoading"

const Boost = ()=>{
    const [value, setValue] = useState("success")
    const [checking, setChecking] = useState(false)
    const [data, setData] = useState({})
    const [prices, setPrices] = useState({})
    const [lvl, setLvl] = useState({
        'storagelvl': 0,
        'recoverlvl': 0, 
        'tablvl': 0,
    })
    const [balance, setBalance] = useState(Number(data.balance))
    const [cliker, setCliker] = useState(Number(data.cliker))
    const [update, setUpdate] = useState(false)
    const [clikerOn, setClikerOn] = useState(data.cliker_on)
    const [isLoading, setIsLoading] = useState(true)
    const tg = window.Telegram.WebApp
    const tgId = tg.initDataUnsafe?.user?.id

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`http://coinbackend.online/user/${tgId}/`)
                setData(response.data)
                const response1 = await axios.get(`http://coinbackend.online/getprice/${tgId}/`)
                setPrices(response1.data)
                console.log(data)
                setIsLoading(false)
              }
              catch(error){
                console.log("У вас не идут данные с сервера:", error)
                setIsLoading(false)
              }
        }
        fetchData()
    }, [update])

    // useEffect(()=>{
    //     const fetchPrices = async()=>{
    //         const response = await axios.get("http://127.0.0.1:8000/getprice/")
    //         setPrices(response.data)
    //     }
    //     fetchPrices()
    // }, [prices])


    useEffect(()=>{
        const fetchData = async(data)=>{
            await setLvl({
                'storagelvl': Number(data.storage_lvl),
                'recoverlvl': Number(data.recover_lvl), 
                'tablvl': Number(data.tab_lvl),
            })
            await setBalance(Number(data.balance))
            await setCliker(Number(data.cliker))
            await setClikerOn(data.cliker_on)
            
        }
        fetchData(data)
    })

    const BuyTab = (el, elPrice)=>{
        const fetch = async(el, elPrice)=>{
            await axios.post(`http://coinbackend.online/${el}/${tgId}/`, {'price': elPrice})
        }
        if (fetch(el, elPrice)){
            return true
        }

    }
    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
    const CheckSaleTab = (el)=>{
        var elPrice = 0
        var elLvl = 0
        switch(el){
            case "setLvltab":   
                elPrice = prices.tabPrice
                elLvl = lvl.tablvl
                break
            case "setLvlrecover":
                elPrice = prices.recoverPrice
                elLvl = lvl.recoverlvl
                break
            case "setLvlstorage":
                elPrice = prices.storagePrice
                elLvl = lvl.storagelvl
                break
            case "setLvlcliker":
                elPrice = prices.clikerPrice
                if(balance >= Number(elPrice)){
                    setClikerOn(true)
                }
                break
        }
        if(isNumber(elPrice)){
            if(balance >= Number(elPrice)){
                var checking = BuyTab(el, elPrice)
                if(checking){
                    setBalance(data.balance - Number(elPrice))
                    setLvl(Number(elLvl) + 1)
                    setChecking(true)
                    setValue("success")
                    setTimeout(()=>{setChecking(false)}, 3000)
                    setUpdate(true)
                    setTimeout(()=>{setUpdate(false)}, 3000)
                }
            }
            else{
                setChecking(true)
                setValue("error")
                setTimeout(()=>{setChecking(false)}, 3000)
            }
        }
        else{
            setChecking(true)
            setValue("max")
            setTimeout(()=>{setChecking(false)}, 3000)
        }
    }

    if(isLoading) return(<IsLoading />)
    else return(
        <div className="main-block">
            <div className="block-blur"><div className="blur"></div></div>
            <Header data={data}/>
            <div className="block-boosts">
                <div className="boostLogo">
                    <div className="img-racket" style={{backgroundImage: `url(${roket})`}}></div>
                    <p>Boost</p>
                </div>
            </div>
            <Modal checking={checking} value={value}/>
            <div className="boosts">

                <div className="boost">
                    <div className="icon-boost" style={{backgroundImage: `url(${MultyTab})`}}></div>
                    <div className="boostname">
                        Multitap
                    </div>
                    <div className="boost-lvl">lvl: {lvl.tablvl}</div>
                    <div className="boost-price">{prices.tabPrice}</div>
                    <button className="BoostBuy" onClick={()=>CheckSaleTab("setLvltab")} >{">"}</button>
                </div>

                <div className="boost">
                    <div className="icon-boost" style={{backgroundImage: `url(${Recover})`}}></div>
                    <div className="boostname">
                        Recovery
                    </div>
                    <div className="boost-lvl">lvl: {lvl.recoverlvl}</div>
                    <div className="boost-price">{prices.recoverPrice}</div>
                    <button className="BoostBuy" onClick={()=>CheckSaleTab("setLvlrecover")}>{">"}</button>
                </div>

                <div className="boost">
                    <div className="icon-boost" style={{backgroundImage: `url(${Limit})`}}></div>
                    <div className="boostname">
                        Storage
                    </div>
                    <div className="boost-lvl">lvl: {lvl.storagelvl}</div>
                    <div className="boost-price">{prices.storagePrice}</div>
                    <button className="BoostBuy" onClick={()=>CheckSaleTab("setLvlstorage")}>{">"}</button>
                </div>
                <div className="boost">
                    <div className="icon-boost" style={{backgroundImage: `url(${Bot})`}}></div>
                    <div className="boostname">
                        AutoClicker
                    </div>
                    <div className="boost-lvl">lvl: {cliker} </div>
                    <div className="boost-price">{prices.clikerPrice}</div>
                    <button className="BoostBuy" onClick={()=>CheckSaleTab("setLvlcliker")}>{">"}</button>
                </div>

                <Box data={data} clikerOn={clikerOn}/>

            </div>
            <Menu />
        </div>
    )
}

export default Boost