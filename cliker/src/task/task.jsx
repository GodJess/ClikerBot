import './task.css'
import Header from '../main/header'
import Menu from '../main/menu'
import { useEffect, useState } from 'react'
import axios from 'axios'
import tasks from '../assets/Task.png'
import '../App.css'
import moneta from '../assets/moneta.png'
import Compleate from './compleate'
import IsLoading from '../loading/IsLoading'

const Task = ()=>{

    const [data, setData] = useState({})
    const [task, setTask] = useState([])
    const [comp, setComp] = useState([])
    const [ans, setAns] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const tg = window.Telegram.WebApp
    const tgId = tg.initDataUnsafe?.user?.id


    useEffect(()=>{
        const fetchData = async()=>{
            try{
              const response = await axios.get(`http://coinbackend.online/user/${tgId}/`)
              setData(response.data)
              const answear = await axios.get("http://coinbackend.online/task/")
              setTask(answear.data)
              const res = await axios.get(`http://coinbackend.online/compleate/${tgId}/`)
              setComp(res.data)
              console.log(data)
              setIsLoading(false)
            }
            catch(error){
              console.log("У вас не идут данные с сервера:", error)
            }
      
          }
          fetchData()
    }, [ans])

    const Post = (number)=>{
        const fetchPOST = async(number)=>{
            const answear = await axios.post(`http://coinbackend.online/comp/${tgId}/`, {'number': number})
            setAns(answear.data)
        }
        fetchPOST(number)

    }
    if(isLoading) return(<IsLoading />)
    else return(
        <div className="main-block">
        <div className="block-blur"><div className="blur"></div></div>
        <Header data={data} />
        <div className="block-leaders">
            <div className="leadersLogo">
                <div className="img-referals" style={{backgroundImage: `url(${tasks})`}}></div>
                <p>Tasks</p>
            </div>
        </div> 
        <div className="listOfTasks">

            {task?.map((el)=>{
                return(
                <div className="block-task" key={el.id}>
                    <div className="task">
                        <div className="taskbonus" onClick={()=>{Post(el.numberOfTask)}}> 
                            <div className="contentOfTask">{el.reward}<img className="Moneta" src={moneta} alt="" /></div>
                            <Compleate number={el.numberOfTask} comp={comp} />
                        </div>
                        <div className="tasktext"><p>{el.description}</p></div>
                    </div>
                </div>
                )
            })}


        </div>

        <Menu />
    </div>
    )
}
export default Task