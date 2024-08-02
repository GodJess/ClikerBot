import { useEffect, useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from "axios"
import Cliker from './main/cliker'
import './App.css'
import IsLoading from './loading/IsLoading'

function App() {

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const tg = window.Telegram.WebApp
  const tgId = tg.initDataUnsafe.user.id

  useEffect(()=>{

      const fetchData = async()=>{
        try{
          const response = await axios.get(`http://coinbackend.online/user/${tgId}/`)
          setData(response.data)
          console.log(data)
          setTimeout(()=>{setIsLoading(false)}, 500)
        }
        catch(error){
          console.log("У вас не идут данные с сервера:", error)
          // setIsLoading(false)
        }

      }
      fetchData()
  },[])

  if(isLoading) return(<IsLoading />)
    else return(
      <Cliker data={data} isLoading={isLoading} setIsLoading={setIsLoading}/>
    )

}

export default App
