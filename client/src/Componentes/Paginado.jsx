import { useState } from 'react';
import style from './Paginado.module.css'


export function Paginado ({dogPorPagina,allDog,paginado,paginaActual, setpaginaActual}){
    
const [value, setvalue] = useState('');


    
    const pageNumbers = []

function handleLi(e){
setvalue(paginaActual)
}

    function handlePaginaAnterior(){
        if(paginaActual>=2){
setpaginaActual(paginaActual-1)
    }
}

function handlePaginaSiguiente(){
    if(paginaActual<pageNumbers.length){
setpaginaActual(paginaActual+1)
}
}

    for ( let i=1; i <=Math.ceil(allDog/dogPorPagina); i++){
        pageNumbers.push(i)
    }

    return(
        
        <div className={style.navPag}>
            <button className={style.btn}  onClick={handlePaginaAnterior}>{'<'}</button>
<ul className={style.pag}>

    {pageNumbers && pageNumbers.map(number=>(
     <li onClick={handleLi} key={number} id={number} value={number} className={paginaActual==number?style.pagActual:style.liPag}>
        <a onClick={()=>paginado(number)}>{number}</a>
        </li>
    ))}
</ul>
<button className={style.btn} onClick={handlePaginaSiguiente}>{'>'}</button>
        </div>

        
    )
}