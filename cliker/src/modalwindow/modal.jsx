import Positive from "./Positive"
import Negative from "./Negativ"
import Neitral from "./Neitral"
import "../boost/boost.css"

const Modal = ({checking, value})=>{
    return(
        <div className="block-modal">
            {
            value === 'success'
                ? <Positive checking={checking} value={value} />
                : value === 'error'
                ? <Negative checking={checking} value={value}/>
                : value === "max"
                ? <Neitral checking={checking} value={value}/>
                : null
            }
        </div>
    )
}

export default Modal