import {useState} from 'react'
import {useDispatch} from 'react-redux'
 import {getName} from '../../action/index'
import { Filtrotemp } from '../Filtrotemp';


export function SearchBar({setpaginaActual,prueba,prueba1}){
    const dispatch = useDispatch();
    const [nombres, setNombres] = useState("");
    
    function handleInputChange(e){
     
        e.preventDefault()
        
        setNombres(e.target.value)
        console.log(nombres)
        
    }

    function handleSumbit(e){
        
        e.preventDefault()
        if(nombres.length>0){
      dispatch(getName(nombres))
      setpaginaActual(1)
        setNombres('');
        e.target.reset()}
        else{
            alert('Ingrese raza a buscar')
        }
    }
       
    


return(
    <div>
        <div>
        <form  onSubmit={(e)=>handleSumbit(e)} >
<input maxLength='20' type="text" placeholder='Busqueda por Raza' onChange ={(e)=>handleInputChange(e)} />
<button type='sumbit'> Buscar</button>
</form>
</div>
<div>

</div>
    </div>
)

}