import { useEffect, useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from "axios"
import Cliker from './main/cliker'
import './App.css'


function App() {

  const [data, setData] = useState({})

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get("http://127.0.0.1:8000/")
        setData(response.data)
        console.log(data)
      }
      catch(error){
        console.log("У вас не идут данные с сервера:", error)
      }

    }
    fetchData()
  },{})

  return(
      <Cliker data={data}/>
    )

}

export default App
