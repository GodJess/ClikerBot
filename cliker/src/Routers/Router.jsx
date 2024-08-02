import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import App from '../App'
import Boost from '../boost/boost'
import Leaders from '../Leaders/leaders'
import Friends from '../frends/frends'
import Task from '../task/task'


const Router = ()=>{

    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <App/>} path="/" />
                <Route element={<Boost/>} path="/boosts/"/>
                <Route element={ <Leaders/>} path="/ratings/"/>
                <Route element={<Friends/>} path="/friends/" />
                <Route element={<Task/>} path="/earns/" />
            </Routes>
        </BrowserRouter>
    )
}
export default Router