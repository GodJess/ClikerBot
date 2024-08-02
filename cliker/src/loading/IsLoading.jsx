import load from '../assets/Background.png'
import "./loading.css"

const IsLoading = ()=>{

    return(
        <div className="main-block">
            <div className="backgroundLoading" style={{ backgroundImage : `url(${load})`}}>
                <div className="loads">
                    <div className="loadingCircle"></div>
                </div>
            </div>
        </div>
    )
}
export default IsLoading