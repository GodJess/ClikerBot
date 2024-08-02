import success from '../assets/Task.png'
import "./task.css"
import success1 from '../assets/success.png'
import success2 from '../assets/succ2.png'


const Compleate = ({number, comp})=>{

    const Check = ()=>{
        for(var i = 0; Number(i) < comp.length; i++){
            var elem = comp[i]
            if(elem.numberOfTask == number){
                return(
                    <div className="block-compleate">
                        <img  src={success2} alt="" />
                    </div>
                )
            }
        }
    }
    return Check()
}   
export default Compleate