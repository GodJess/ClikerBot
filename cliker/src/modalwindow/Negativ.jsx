import "../boost/boost.css"

const Negative = ({checking, value})=>{

    if(checking){
        return(
            <div className="error_modal active">
                <p color="black" fontSize="20px">{value}: insufficient funds</p>
            </div>
        )
    }
    else{
        return(
            <div className="error_modal">
                <p color="black" fontSize="20px">{value}: insufficient funds</p>
            </div>
        )
    }
}
export default Negative