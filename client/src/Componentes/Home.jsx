import {useEffect, useState} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import { getdOG, getTemperament, filtroDogPorCreacion, darvuelta} from '../action'
import {Link} from 'react-router-dom'
import { Card } from './Card';
import style from './Home.module.css'
import { NavBar } from './NavBar';
import { Paginado } from './Paginado';
import { SubNav } from './SubNav';
import { Filtrotemp } from './Filtrotemp';


export function Home() {

const dispatch = useDispatch();
const allDog = useSelector((state) => state.dog)

const [prueba, setprueba] = useState('abc');
const [prueba1, setprueba1] = useState('asc');
const [, setOrden] = useState('');
const [paginaActual, setpaginaActual] = useState(1);
const [dogPorPagina] = useState(8);
const indexOfLastCharcater = paginaActual * dogPorPagina
const indexOfFirstDog = indexOfLastCharcater - dogPorPagina
const dogsActuales = allDog.slice(indexOfFirstDog,indexOfLastCharcater)
const paginado = (pageNumber) => {
    setpaginaActual(pageNumber)
}








function handelFiltroCreacion(e){
dispatch(filtroDogPorCreacion(e.target.value))
setpaginaActual(1)
}
let x1 = prueba + prueba1
function handeldarvuelta(e){
    e.preventDefault();
    dispatch(darvuelta(x1))
    setpaginaActual(1)
    setOrden(`${e.target.value}`)
}




function handlePrueba(e){
setprueba((previo)=> {
   const newState = (e.target.value)
    return newState
})

}
function handlePrueba1(e){
    setprueba1((previo)=> {
       const newState = (e.target.value)
        return newState
    })
    
    }



useEffect(()=>{
dispatch(getdOG())
dispatch(getTemperament())

},[dispatch])




    return (
        <div className={style.fondo}>

            
<NavBar/>



<nav  className={style.navBusqueda}> 
<select onChange={e =>handelFiltroCreacion(e)} >
<option multiple value="Todos">Todos</option>
<option multiple value="creado">Creados</option>
<option multiple value="api">Api</option>

</select>

<form onClick={e => handeldarvuelta(e)}>

<select onChange={e =>handlePrueba(e)}>

<option value="abc">ABC</option>
<option value="pesomas">PESO</option>
</select>

<select onChange={e =>handlePrueba1(e)}>
<option value="asc">Ascendente</option>
<option value="desc">Descendente</option>


</select>

</form>

<SubNav setpaginaActual={setpaginaActual}/>

{/* <button type='sumbit' onClick={(e)=> handleReset(e)}>Reset </button> */}


<Filtrotemp prueba={prueba} prueba1={prueba1} setpaginaActual={setpaginaActual} />

</nav>






<Paginado  dogPorPagina={dogPorPagina} allDog={allDog.length} paginado = {paginado}  />



<ul className={style.grilla}>



{
dogsActuales?.map((e) => {
    return(
    <div className={style.prueba}>
        
<Link  to={"/home/" + e.id}> 

<Card  keys={e.id} name={e.name} image = {e.imagen} bred_for={e.bred_for}
weight= {e.weight} temperament = {e.temperament || e.temperaments} />


   
</Link>

    </div>
    )
})
}

</ul>




        </div>
    )
}
