import { Link} from "react-router-dom"
import style from'./NavBar.module.css'

export function NavBar() {



    return (
        <nav className={style.nav}>

<p className={style.text}>Pagina web Raza de perros</p>

     <ul className={style.lista}>   

<Link to ='/dog'> 
<li><button className={style.btn} >Create Dog </button></li></Link> 

<Link to = '/home'>
<li><button className={style.btn}>Home</button>  </li></Link>  

</ul>  
           
        </nav>
    )
}
