import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  getTemperament, postDog } from "../action";
import { useDispatch, useSelector } from "react-redux";
import style from "./FormDog.module.css"
import {NavBar} from "./NavBar"


export function FormDog(){
    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temp)

    const [inputs, setinputs] = useState({
        name:"",
        life_span:"",
        imagen:"",
        bred_for:"",
        temperament: [],
        weight_max:"",
        weight_min:"",
        height_min:"",
        height_max:"",
    }); 



    const x = {
        name:inputs.name,
        weight: inputs.weight_min.concat('-') + inputs.weight_max,
        height:inputs.height_min.concat('-') +inputs.height_max,
        life_span:inputs.life_span,
        imagen:inputs.imagen?inputs.imagen : 'https://media.istockphoto.com/photos/dog-with-sign-around-its-neck-picture-id1188642662?k=20&m=1188642662&s=612x612&w=0&h=f0FQ_P-v_ZbINmmpdTsfSX3V0__ueyAMInGLp5-R6HE=',
        bred_for:inputs.bred_for,
        temperament: inputs.temperament,
      
    }

    const [errors, setErrors] = useState({})


  

// function handleChange(e){
    

//     setinputs({
//         ...inputs,
//         [e.target.name]: e.target.value
//     })
//     setErrors( validacion(inputs))
// }

function handleChange(e){
 setinputs((previo) => {
       const newState ={ ...inputs,
        [e.target.name]: e.target.value
    }
    setErrors( validacion(newState))
    return newState
    })
    
}

function handleSelect(e){
    setinputs((previo) => {
       const newStates ={ ...inputs,
          
        temperament : [...inputs.temperament,inputs.temperament.includes(e.target.value) ? '' : e.target.value ]
       }
       setErrors(validacion(newStates))
       return newStates
    })
    
}

function handleDelete(e){
    
    setinputs({
        ...inputs,
        temperament : inputs.temperament.filter(temp => temp !==e)
    })
}

function handleSumbit(e){

    setErrors( validacion(inputs))

    if(!errors.weight_max && !errors.name && !errors.height_max &&!errors.temperament){
    
    dispatch(postDog(x))
    alert("Raza Creada")
    setinputs({
        name:"",
        weight_max:"",
        weight_min:"",
        height_max:"",
        height_min:"",
        life_span:"",
        imagen:"",
        bred_for:"",
        temperament: []
    })} else {
        e.preventDefault()
        return alert('Completa correctamente todos los campos')
    }
    
}


function validacion(inputs){
const errors = {}
if(!inputs.name){
    errors.name = 'Nombre de raza requerido'
}
if(parseInt(inputs.height_max) < parseInt(inputs.height_min)){
    errors.height_max = 'height max debe ser mayor al minimo'
}

if(parseInt(inputs.weight_max) < parseInt(inputs.weight_min)){
    errors.weight_max = 'Weight max debe ser mayor al minimo'
}

if(inputs.temperament.length == 0 ){
    errors.temperament = 'Debe ingresar al menos un temperamento'
} 



return errors
}

useEffect(()=>{
    dispatch(getTemperament())
    
    },[dispatch])

return(
    
    <div className={style.padre}>
        <NavBar/>
<Link to = '/home'><button>Volver</button></Link>
<h1>Crea Tu Propia Raza</h1>
<form onSubmit={(e)=>handleSumbit(e)}  >
<div>
    <label>Nombre:</label>
    <input maxlength="30" autocomplete= "off" placeholder ="Ingrese x" className={errors.name && style.danger} required  onChange={handleChange} type="text" value={inputs.name} name = "name" />
    <p>{errors.name}</p>
</div>
<div>
    <label>weight(Max - Min):</label>
    <input maxlength="2" required  min = "1" autocomplete= "off" placeholder ="Ingrese x" onChange={handleChange} type="text" value={inputs.weight_max} name = "weight_max" />
    <input maxlength="2" required autocomplete= "off" placeholder ="Ingrese x"  onChange={handleChange} type="text" value={inputs.weight_min} name = "weight_min" />
    <p>{errors.weight_max}</p>
    
</div>
<div>
    <label>height(Max-Min):</label>
    <input maxlength="2" required autocomplete= "off" placeholder ="Ingrese x" onChange={handleChange} type="number" value={inputs.height_max} name = "height_max" />
    <input maxlength="2" required autocomplete= "off" placeholder ="Ingrese x" onChange={handleChange} type="number" value={inputs.height_min} name = "height_min" />
        <p>{errors.height_max}</p>

</div>
<div>
    <label>Life span:</label>
    <input maxlength="2" required autocomplete= "off" placeholder ="Ingrese x" onChange={handleChange} type="text" value={inputs.life_span} name = "life_span" />
</div>
<div>
    <label>Bred For:</label>
    <input maxlength="1000" onChange={handleChange} type="text" value={inputs.bred_for} name = "bred_for" />
</div>


<div>
    <label>Imagen:</label>
    <input onChange={handleChange} type="text" value={inputs.imagen} name = "imagen" />
</div>
<select   onChange={(e)=>handleSelect(e) }>
     {  temperament.map((tem)=>(
        
        <option value={tem.name}>{tem.name}</option>
    ))}
</select>

{inputs.temperament.map(e=>
e !== '' ?
    <div>
   <ul><li>{e} 
    <button required type="button" onClick={()=>handleDelete(e)}>X</button>
    </li></ul>   
    </div> : handleSumbit
    )}
    <p>{errors.temperament}</p>
<br />
<br />
<button onClick={handleChange} type="sumbit">Crear Personaje</button>
</form>

    </div>

)
}

