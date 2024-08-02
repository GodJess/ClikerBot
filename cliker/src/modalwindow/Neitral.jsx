import "../boost/boost.css"


const Neitral = ({checking, value})=>{

    if(checking){
        return(
            <div className="modal-neit active">
                <p>{value}: max lvl</p>
            </div>
        )
    }
    else{
        return(
            <div className="modal-neit">
                <p>{value}: max lvl</p>
            </div>
        )
    }
    
}
export default Neitral