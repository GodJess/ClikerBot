import earns from '../assets/akar-icons_coin.png'
import rocket from '../assets/carbon_rocket.png'
import notice from '../assets/99+.png'
import book from '../assets/book.png'
import home from '../assets/home.png'
import { Link } from 'react-router-dom'

import '../App.css'

const Menu = ()=>{
    return(
        <div className="menuBlock">
        
        <div className="flex-menu">
        <div className="menu">

          <div className="widjets">
            <Link className='Links' to="/">
              <div className="widjets-logo"><img className='ImgWid ' src={home} alt="" /></div>
              <div className="widjets-name"><p>Home</p></div>
            </Link>
          </div>

          <div className="widjets">
            <Link className='Links' to="/earns/">
              <div className="widjets-logo"><img className='ImgWid' src={earns} alt="" /></div>
              <div className="widjets-name"><p>Earn</p></div>
            </Link>
          </div>

          <div className="widjets">
            <Link className='Links' to="/boosts/">
              <div className="widjets-logo"><img className='ImgWid' src={rocket} alt="" /></div>
              <div className="widjets-name"><p>Boost</p></div>
            </Link>
          </div>

          <div className="widjets">
            <Link className='Links' to="/friends/">
              <div className="widjets-logo"><img className='ImgWid ' src={book} alt="" /></div>
              <div className="widjets-name"><p>Frens</p></div>
            </Link>
          </div>

        </div>
        </div>

      </div>
    )
}

export default Menu