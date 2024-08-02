import '../App.css'

const Header = ({data})=>{
    return(
        <div className="header-block">
            <p className='pp'><ion-icon name="close"></ion-icon></p> 
            <div className="circle" style={{backgroundImage:`url(${data.tg_user_img})`}}></div>
        </div>
    )

}
export default Header