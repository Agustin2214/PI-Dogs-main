




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detellesDog } from "../action";
import { NavBar } from "./NavBar";
import style from './CardDetalles.module.css'
import { Loading } from "./Loading";



export function CardDetalles(props) {
    console.log(props)
    const dispatch = useDispatch();
    const params = props.match.params.id

 
    
    useEffect(() => {
        dispatch(detellesDog(params))
        
    }, [dispatch]);

const dogDetalle = useSelector(state => state.detalles);






    return (
        <div className={style.fondo}>
<NavBar/>
{dogDetalle.name ? <div className={style.padre}> 
    <div className={style.infoColum} >
<img className={style.imge} src={dogDetalle.imagen} height={800} width={800} alt="" />
</div>

<div className={style.infoColum}>
<h1>{dogDetalle.name}</h1>
<h2>Tiempo de Vida :{dogDetalle.life_span}</h2>
<h2>Peso:{dogDetalle.weight }</h2>
<h2>Tamaño:{dogDetalle.height}</h2>
<h2>Criado para:{dogDetalle.bred_for}</h2>
<h2>Temperamento:{dogDetalle.temperament || dogDetalle.temperaments }</h2>
<Link to='/home/'><button >Volver</button> </Link>
</div>
 
</div> :  <Loading/>
}

      



        
            
        </div>
    )
}

