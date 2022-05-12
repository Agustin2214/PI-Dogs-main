import img from '../media/perrito.jpg'
import style from './LadingPage.module.css'
import { Link } from 'react-router-dom'

export function LadingPage() {
    return (
        <div className={style.app}>
           <img className={style.img}  src={img} alt="asd" />
            
            <p className={style.txt}>BIENVENIDOS</p>
            <Link to = '/home'>   <button className={style.btn}> Ingresar </button></Link>
        </div>
    )
}
