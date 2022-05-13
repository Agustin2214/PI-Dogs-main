import style from './Paginado.module.css'


export function Paginado ({dogPorPagina,allDog,paginado}){
    

    
    const pageNumbers = []



    for ( let i=1; i <=Math.ceil(allDog/dogPorPagina); i++){
        pageNumbers.push(i)
    }

    return(
        <nav className={style.navPag}>
            
<ul className={style.pag}>

    {pageNumbers && pageNumbers.map(number=>(
     <li key={number} className={style.liPag}>
        <a onClick={()=>paginado(number)}>{number}</a>
        </li>
    ))}
</ul>

        </nav>
    )
}