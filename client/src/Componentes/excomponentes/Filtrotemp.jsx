
import { useEffect, useState} from 'react'
import{useDispatch,useSelector} from 'react-redux'

import { darvuelta, filtroTemperament } from '../action';
import style from './Filtrotemp.module.css'

 export function Filtrotemp({prueba,prueba1,setpaginaActual,setOrden}) {

    const [inputs, setinputs] = useState({temperamentos: []});
    const temperament = useSelector((state) => state.temp)
    const dog = useSelector((state) => state.dog)
    const dispatch = useDispatch();
    const [pruebas, setpruebas] = useState('abcasc');
   
    let x1 = prueba + prueba1
    console.log(x1)

   function handleReset(e){
    e.preventDefault();
    dispatch(filtroTemperament(''))
    setinputs({temperamentos: []})
    setpruebas((previo)=> {
        const newState = prueba + prueba1
        console.log(newState)
         return newState
         
     })
     handleprueba(e)
    console.log(pruebas)
    
  
   }
     
function handleprueba(e){
    e.preventDefault()
    dispatch(darvuelta(pruebas))
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
        setpaginaActual(1)
        
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
        setpaginaActual(1)
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
    