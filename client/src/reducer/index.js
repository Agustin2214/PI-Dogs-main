import { DAR_VUELTA, DETALLES_DOG, FILTRO_CREACION, FILTRO_TEMP, GET_DOG, GET_NAME, GET_TEMPERAMENT, ORDEN_POR_NOMBRE , POST_DOG } from "../action/actionType";

const initialState = {
    dog : [],
    dogdupli : [],
    temp: [],
    detalles: []
}

export function rootReducer(state = initialState,action){
switch(action.type){
    case  GET_DOG:
        return{
            ...state,
            dog: action.payload,
            dogdupli:action.payload,
           
        }

        case  GET_TEMPERAMENT:
            return{
                ...state,
                temp: action.payload
            }


     case FILTRO_CREACION:
        const allDogs = state.dogdupli
    
        const filtroCreacion  = action.payload === 'creado' ? allDogs.filter(e => e.creadoEnBase) : allDogs.filter(e => !e.creadoEnBase)

         return{
            ...state,
            dog: action.payload === 'Todos' ? allDogs : filtroCreacion

         }   

    



   
            case DAR_VUELTA:
    
                let sort1 = action.payload === 'abcasc' ? state.dog.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1
                    }
                    return 0
               
                }) : action.payload === 'pesomasasc' ? state.dog.sort(function(a,b){
                    if(parseInt(a.weight) >parseInt(b.weight)){
                        return 1;
                    }
                    if(parseInt(b.weight) > parseInt(a.weight)){
                        return -1
                    }
                    return 0
                }) :   action.payload === 'abcdesc' ? state.dog.sort(function(a,b){
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() < a.name.toLowerCase()){
                        return -1
                    }
                    return 0
               
                }) : action.payload === 'pesomasdesc' ? state.dog.sort(function(a,b){
                    if(parseInt(a.weight) <parseInt(b.weight)){
                        return 1;
                    }
                    if(parseInt(b.weight) < parseInt(a.weight)){
                        return -1
                    }
                    return 0
                }) :   state.dog
    
    



            return{
                ...state,
                dog: sort1,
                
            }

    
//---------------------------------------------------------------------------------------------------
        case FILTRO_TEMP:
        
            return{
                ...state,
                dog: action.payload,
                dogdupli: action.payload

               }

            
     
        
//--------------------------------------------------------------------------------------------------
           case GET_NAME:
               return {
                   ...state,
                   dog: action.payload,
                   dogdupli: action.payload
               }
    
               case POST_DOG:{
                   return{
                       ...state,
                   }
               }

               case DETALLES_DOG:
                   return{
                    ...state,
                    detalles: action.payload,
                dogdupli: action.payload

                   }

        default: return state;


        
}

}
