import "../boost/boost.css"


const Positive = ({checking, value})=>{

    if(checking){
        return(
            <div className="modal-success active">
                <p>{value}: lvl is huge</p>
            </div>
        )
    }
    else{
        return(
            <div className="modal-success">
                <p>{value}: lvl is huge</p>
            </div>
        )
    }
    
}
export default Positive