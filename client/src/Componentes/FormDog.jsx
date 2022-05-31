import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  getTemperament, postDog } from "../action";
import { useDispatch, useSelector } from "react-redux";
import style from "./FormDog.module.css"
import {NavBar} from "./NavBar"
import {RiDeleteBin6Line} from 'react-icons/ri'

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
    errors.height_max = 'Altura max debe ser mayor al minimo.'
}
if(parseInt(inputs.height_max) < 0  || parseInt(inputs.height_max) > 150){
    errors.height_min = 'La altura debe ser entre 1 y 150cm'
}
if(parseInt(inputs.height_min) < 0  || parseInt(inputs.height_min) > 150){
    errors.height_min = 'La altura debe ser entre 1 y 150cm'
}

if(parseInt(inputs.weight_max) < parseInt(inputs.weight_min)){
    errors.weight_max = ' Peso Maximo debe ser mayor al minimo.'
}
if(parseInt(inputs.weight_max) < 0  || parseInt(inputs.weight_max) > 200){
    errors.weight_min = 'El peso debe ser entre 1 y 200'
}
if(parseInt(inputs.weight_min) < 0  || parseInt(inputs.weight_min) > 200){
    errors.weight_min = 'El peso debe ser entre 1 y 200'
}


if(inputs.temperament.length === 0 ){
    errors.temperament = 'Debe ingresar al menos un temperamento'
} 




return errors
}

useEffect(()=>{
    dispatch(getTemperament())
    
    },[dispatch])

return(
    
    <div className={style.fondo}>
        <NavBar/>
        <div className={style.row}>
 <div className={style.form1}>   

<h1>Crea Tu Propia Raza</h1>
<form className={style.padre} onSubmit={(e)=>handleSumbit(e)}  >
<div >
    <label className={style.label}>Nombre:</label>
    <input className={style.inputsname} maxlength="30" autocomplete= "off" placeholder ="Ingrese nombre de raza"  required  onChange={handleChange} type="text" value={inputs.name} name = "name" />
    <p className={style.error}>{errors.name}</p>
</div> 
<div>
    <label className={style.label}>Peso(Max - Min):</label>
    <input className={style.inputsname} min="1" max="200" required   autocomplete= "off" placeholder ="Ingrese Peso Maximo" onChange={handleChange} type="number" value={inputs.weight_max} name = "weight_max" />
    <input className={style.inputsname} min="1" max="200" required autocomplete= "off" placeholder ="Ingrese Peso Minimo"  onChange={handleChange} type="number" value={inputs.weight_min} name = "weight_min" />
    <p className={style.error}>{errors.weight_max}  {errors.weight_min}</p>
    
</div>
<div>
    <label className={style.label}>Altura(Max-Min):</label>
    <input className={style.inputsname} min="1" max="150" required autocomplete= "off" placeholder ="Ingrese altura maxima" onChange={handleChange} type="number" value={inputs.height_max} name = "height_max" />
    <input className={style.inputsname} min="1" max="150" required autocomplete= "off" placeholder ="Ingrese altura minma" onChange={handleChange} type="number" value={inputs.height_min} name = "height_min" />
        <p className={style.error}>{errors.height_max} {errors.height_min}</p>

</div>
<div>
    <label className={style.label}>Esperanza de vida:</label>
    <input className={style.inputsname} min="1" max="50" required autocomplete= "off" placeholder ="Ingrese esperanza de vida" onChange={handleChange} type="number" value={inputs.life_span} name = "life_span" />
</div>
<div>
    <label className={style.label}>Criado para:</label>
    <input className={style.inputsname} placeholder ="Criado para" maxlength="1000" onChange={handleChange} type="text" value={inputs.bred_for} name = "bred_for" />
</div>


<div>
    <label  className={style.label}>Imagen:</label>
    <input placeholder ="Url imagen" className={style.inputsname} onChange={handleChange} type="text" value={inputs.imagen} name = "imagen" />
    
</div>
<select className={style.select}  onChange={(e)=>handleSelect(e) }>
     {  temperament.map((tem)=>(
        
        <option value={tem.name}>{tem.name}</option>
    ))}
    <p>Temperamentos:</p>
</select>

{inputs.temperament.map(e=>
e !== '' ?
    <div className={style.liCont}>
   <ul className={style.ul}><li className={style.li}>
       {e} 
    <button className={style.btn} required type="button" onClick={()=>handleDelete(e)}><RiDeleteBin6Line/></button>
    </li></ul>   
    </div> : ''
    )}
    <p className={style.error}>{errors.temperament}</p>
<br />
<br />
<button className={style.enviar} onClick={handleChange} type="sumbit">Crear Personaje</button>
</form>
</div>    


    </div>
    </div> 

)
}

