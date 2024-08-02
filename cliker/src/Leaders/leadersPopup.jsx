

const LeadersPopup = ({popup, setPopup, list})=>{

    if(popup){
        return(
            <div className="popupLead active">
            <div className="block-popup-scroll active">
                <div className="block-close-popup"><ion-icon className="iconClose" name="close" onClick={()=>{setPopup(false)}}></ion-icon></div>
                <div className="block-liaders-scroll">
                {list.map((element, index)=>{
                    return(
                        <div className="examp" key={element.id}>
                            <div className="number">{index + 1}</div>
                            <div className="username">{element.tg_user_name}</div>
                            <div className="usercount">{element.count}</div>
                        </div>
                    )
                })}
                <div className="yourplace-block">                    
                    <div className="yournumber">10000+</div>
                    <div className="yourname">You</div>
                    <div className="usercount">2100</div>
                </div>

                </div>
            </div>
            </div>
        )
    }
    else{
        return(
            <div className="popupLead">
            <div className="block-popup-scroll">
                <div className="block-close-popup"><ion-icon className="iconClose" name="close" onClick={()=>{console.log("Закрыто")}}></ion-icon></div>
                <div className="block-liaders-scroll">
                {list.map((element, index)=>{
                    return(
                        <div className="examp" key={element.id}>
                            <div className="number">{index + 1}</div>
                            <div className="username">{element.tg_user_name}</div>
                            <div className="usercount">{element.count}</div>
                        </div>
                    )
                })}
                <div className="yourplace-block">                    
                    <div className="yournumber">10000+</div>
                    <div className="yourname">You</div>
                    <div className="usercount">2100</div>
                </div>

                </div>
            </div>
            </div>
        )
    }

}
export default LeadersPopup