
import { useState} from 'react'
import{useDispatch,useSelector} from 'react-redux'

import { darvuelta, filtroTemperament } from '../action';
import style from './Filtrotemp.module.css'






// export function Filtrotemp() {

// const [inputs, setinputs] = useState({temperamentos: []});
// const temperament = useSelector((state) => state.temp)
// const dispatch = useDispatch();

// const inputs2 = inputs.temperamentos.join('-').replaceAll(' ','%').toString()
// console.log(inputs2) 
//  function  handleSelect(e){
//     if(e.target.value !== 'All'){
//     setinputs({
//         ...inputs,
//         temperamentos : [...inputs.temperamentos,inputs.temperamentos.includes(e.target.value) ? '' : e.target.value ]
//     })}else{
//         setinputs({
//         ...inputs,
//         temperamentos : []
//     })
    
// }
 
// }
// function handleDelete(e){
    
//     setinputs({
//         ...inputs,
//         temperamentos : inputs.temperamentos.filter(temp => temp !==e)
//     })
   
   
// }

// function handleSumbit(e){
//     e.preventDefault()
//     dispatch(filtroTemperament(inputs2))
// }


//     return (
//         <div>
//         <select onChange={(e)=>handleSelect(e)}>
//         <option>All</option>



//             {temperament?.map((e) => {
//     return(
        
    
        
        
        
//         <option className={style.option} value={e.name}>
//         {e.name}
//         </option>
       
 
   
           

   
// )}

// )

// }

//         </select>

//         {inputs.temperamentos.map(e=>
// e !== '' ?
//     <div>
//    <ul><li className={style.elemento}>{e} 
//     <button type="button" onClick={()=>handleDelete(e)}>X</button>
//     </li></ul>   
//     </div> : ''
//     )}
//     <button type ='sumbit' onClick={(e)=>handleSumbit(e)}>sumbit</button>
//         </div>
//     )
// }
 export function Filtrotemp({prueba,prueba1,setpaginaActual,setOrden}) {

    const [inputs, setinputs] = useState({temperamentos: []});
    const temperament = useSelector((state) => state.temp)
    const dog = useSelector((state) => state.dog)
    const dispatch = useDispatch();
    
   
    let x1 = prueba + prueba1
    console.log(x1)

   function handleReset(e){
    e.preventDefault();
    dispatch(filtroTemperament(''))
    setinputs({temperamentos: []})
  
   }
     


     function  handleSelect(e){
       
        if(dog[0].height !== 'NO ENCONTRADO'){
           
    
        setinputs((previo) => {
            const newState ={
            ...inputs,
            temperamentos : [...inputs.temperamentos,inputs.temperamentos.includes(e.target.value) ? '' : e.target.value ]
        }
      
        const x = newState.temperamentos.join('-').replaceAll(' ','%').trim()
        
        
        dispatch(filtroTemperament(x))
        
        return newState


        })}else{
    return alert('No existe perro con los temperamentos buscados') 
    }
    
    }
    
    function handleDelete(e){
        
        setinputs((previo) => {
            const newState ={
            ...inputs,
            temperamentos : inputs.temperamentos.filter(temp => temp !==e)
        }
        
        dispatch(filtroTemperament((newState.temperamentos.join('-').replaceAll(' ','%').toString())))
        return newState
        })
     
        
    }
    
   
    
    
        return (
            <div  className={style.contenedor}>

                <div>
            <select onChange={(e)=>handleSelect(e)}>
            
    
            
    
                {temperament?.map((e) => {
        return(
            
        
            
            
            
            <option key={e.id} className={style.option} value={e.name}>
            {e.name}
            </option>
           
            
       
               
    
       
    )}
    
    )
    
    }
    
            </select>
            </div>
    
            {inputs.temperamentos.map(e=>
    e !== '' ?
        <div>
       <ul className={style.lista}><li  className={style.elemento}>{e} 
        <button type="button" onClick={()=>handleDelete(e)}>x</button>
        </li></ul>   
        </div> : ''
        )}
         <button onClick={handleReset} >Reset</button> 
            </div>
        )
    }
    