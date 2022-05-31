import axios from 'axios';
import { DAR_VUELTA, DETALLES_DOG, FILTRO_CREACION, FILTRO_TEMP, GET_DOG, GET_NAME, GET_TEMPERAMENT, ORDEN_POR_NOMBRE, ORDEN_POR_PESO } from './actionType';

export function getdOG() {
  return async function(dispatch){
      var json = await axios.get("http://localhost:3001/dog")

return dispatch({
type: GET_DOG,
payload: json.data
})

  }
}


export function getTemperament() {
  return async function(dispatch){
      var jsonX = await axios.get("http://localhost:3001/temperament")

return dispatch({
type: GET_TEMPERAMENT,
payload: jsonX.data
})

  }
}

export function filtroDogPorCreacion(payload){
  return {
    type: FILTRO_CREACION,
    payload: payload
  }
}


export function ordenpornombre(payload){
  return{
    type: ORDEN_POR_NOMBRE,
    payload: payload,
    
  }
}
export function darvuelta(payload){
  return{
    type: DAR_VUELTA,
    payload: payload
  }
}

export function postDog(payload){
  return async function(dispatch){
    const respuesta = await axios.post('http://localhost:3001/dog',payload);
    return  respuesta
  }
}


export function ordenporpeso(payload){
  return{
    type: ORDEN_POR_PESO,
    payload: payload
  }
}



export function detellesDog(id){
  return async function(dispatch){
    try{
      var json = await axios.get("http://localhost:3001/dog/" + id);
      return dispatch({
        type: DETALLES_DOG,
        payload: json.data
      })
    } catch(error){
      console.log(error)
      return dispatch({
        type: DETALLES_DOG,
        payload: error.response.data
    })

}
  }
}
  



export function filtroTemperament(temperamentos,name){
  const temperamentos1 = temperamentos?temperamentos:' '
  const name1 = name?name:' '
  return async function(dispatch){
    try{  var json = await axios.get(`http://localhost:3001/dogs?temperamentoss=${temperamentos1}&name=${name1}`)

return dispatch({
type: FILTRO_TEMP,
payload: json.data
})
    } catch(er){
      console.log(er.response.data)
      return dispatch({
        type: FILTRO_TEMP,
        payload: er.response.data
     
    })
  } 
  }
}


