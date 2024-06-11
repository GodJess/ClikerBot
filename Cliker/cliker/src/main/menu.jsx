import earns from '../assets/akar-icons_coin.png'
import rocket from '../assets/carbon_rocket.png'
import notice from '../assets/99+.png'

import '../App.css'

const Menu = ()=>{
    return(
        <div className="menuBlock">
        
        <div className="flex-menu">
        <div className="menu">
          <div className="widjets">
            <div className="widjets-logo"><img className='ImgWid' src={earns} alt="" /></div>
            <div className="widjets-name"><p>Earn</p></div>
          </div>

          <div className="widjets">
            <div className="widjets-logo"><img className='ImgWid' src={rocket} alt="" /></div>
            <div className="widjets-name"><p>Boost</p></div>
          </div>

          <div className="widjets">
            <div className="widjets-logo"><img className='ImgWid not' src={notice} alt="" /></div>
            <div className="widjets-name"><p>Frens</p></div>
          </div>
        </div>
        </div>

      </div>
    )
}

export default Menu