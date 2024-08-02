import bronze from "../assets/Bronze.png"
import silver from '../assets/Silver.png'
import gold from '../assets/Gold.png'
import platina from '../assets/Platinum.png'
import diamond from '../assets/Diamond.png'
import '../App.css'

const TypeOfCup = ({el})=>{

    const check = (el)=>{
        switch(el){
            case "Bronze":
                return bronze
            case "Silver":
                return silver
            case "Gold":
                return gold
            case "Platina":
                return platina
            case "Diamond":
                return diamond
        }
    }

    return(
        <img className="typeOfCup" src={check(el)} alt="" />
    )
}
export default TypeOfCup