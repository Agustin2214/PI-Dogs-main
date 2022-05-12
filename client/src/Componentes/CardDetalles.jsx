




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detellesDog } from "../action";
import { NavBar } from "./NavBar";
import style from './CardDetalles.module.css'

            
// //             <img className={style.img} src={image} alt="not found" />

// //             <div className={style.text}>{name}</div>
// //             <div className={style.text1}>Min-Max: {weight}</div>
// //             <div className={style.text1}>Min-Max: {height}</div>
// //             <div className={style.text1}>Min-Max: {life_span}</div>
// //             <div className={style.text1}>Min-Max: {bred_for}</div>
// //             <div className={style.text2}>Temperamento: {temperament}</div>
            
            
// //             </li>
// //             </div>
           
        
// //     )
// // }

// export function CardDetalles(props) {
//     console.log(props)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(detellesDog(props.match.params.id))
//     }, [dispatch]);

// const dogDetalle = useSelector(state => state.detalles);

//     return (
//         <div>
//           {dogDetalle.length>0 ? <div>
//             <h1>{dogDetalle.name}</h1>
//           </div> : <p>no existe</p>
//           }

// <Link to='/home'>Volver</Link>

//         </div> 
//     )
// }



export function CardDetalles(props) {
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detellesDog(props.match.params.id))
        
    }, []);

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
<h2>bred for:{dogDetalle.bred_for}</h2>
<h2>Temperamento:{dogDetalle.temperament || dogDetalle.temperaments }</h2>
<Link to='/home'><button>Volver</button> </Link>
</div>
 
</div> : <p>loading</p>
}

      



        
            
        </div>
    )
}

