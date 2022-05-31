import { useDispatch, useSelector } from "react-redux";
import { darvuelta, filtroTemperament } from "../action";
import style from "./BarraFiltro.module.css";
import { useState } from "react";
import {FcSearch} from 'react-icons/fc'
import {BiReset} from 'react-icons/bi'
import {RiDeleteBin6Line} from 'react-icons/ri'



export function BarraFiltro({ prueba, prueba1, setpaginaActual, setOrden }) {
  const [nombres, setNombres] = useState("");
  const [inputs, setinputs] = useState({ temperamentos: [] });
  const temperament = useSelector((state) => state.temp);
  const dog = useSelector((state) => state.dog);
  const dispatch = useDispatch();
  

  let x1 = prueba + prueba1;
  console.log(x1);

  function handleReset(e) {
    e.preventDefault();
    dispatch(filtroTemperament(""));
    setinputs({ temperamentos: [] });
    setNombres("")
    dispatch(darvuelta(x1))
  }

  function handleSelect(e) {
    if (dog[0].height !== "NO ENCONTRADO") {
      setinputs((previo) => {
        const newState = {
          ...inputs,
          temperamentos: [
            ...inputs.temperamentos,
            inputs.temperamentos.includes(e.target.value) ? "" : e.target.value,
          ],
        };
        const x = newState.temperamentos.join("-").replaceAll(" ", "%").trim();

        if (nombres.length > 0) {
          dispatch(filtroTemperament(x, nombres));
          setpaginaActual(1);
          dispatch(darvuelta(x1))
          return newState;
        } else {
          dispatch(filtroTemperament(x));
          setpaginaActual(1);
          dispatch(darvuelta(x1))
          return newState;
        }
      });
    } else {
      return alert("No existe perro con los temperamentos buscados");
    }
  }

  function handleDelete(e) {
    setinputs((previo) => {
      const newState = {
        ...inputs,
        temperamentos: inputs.temperamentos.filter((temp) => temp !== e),
      };

      dispatch(
        filtroTemperament(
          newState.temperamentos.join("-").replaceAll(" ", "%").toString(),
          nombres
        )
      );
      setpaginaActual(1);
      dispatch(darvuelta(x1))
      return newState;
    });
  }

  function handleInputChange(e) {
    e.preventDefault();

    setNombres(e.target.value);
    console.log(nombres);
  }

  function handleSumbit(e) {
    const x = inputs.temperamentos.join("-").replaceAll(" ", "%").trim();
    console.log(x)
if(x !== ''&&x !== ' '){
    e.preventDefault();
    
      dispatch(filtroTemperament(x, nombres));
      setpaginaActual(1);
   
    } else {
    e.preventDefault();
    
      dispatch(filtroTemperament('all', nombres));
      setpaginaActual(1);
     
    }
  }


  return (
    <div className={style.padre}>
      <div className={style.divCont}>
        <form className={style.forms} >
          <div>
          <input
          className={style.input}
          value={nombres}
            maxLength="20"
            type="text"
            placeholder="Busqueda por Raza"
            onChange={(e) => handleInputChange(e)}
          />
</div>
<div>
          <button className={style.btn1} onClick={(e) => handleSumbit(e)} type="buton"> <FcSearch/></button>
          </div>
        </form>
      </div>
    
      <div>
        <select placeholder="Seleccione Raza" className={style.selected} onChange={(e) => handleSelect(e)}>
          {temperament?.map((e) => {
            return (
              <option key={e.id} className={style.option} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
        <button className={style.btn} onClick={handleReset}><BiReset/></button>
      </div>

      {inputs.temperamentos.map((e) =>
        e !== "" ? (
          <div className={style.divli}>
            <ul className={style.lista}>
              <li className={style.elemento}>
                {e}
                <button className={style.btndelete} type="button"  onClick={() => handleDelete(e)}>
                  <RiDeleteBin6Line/>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )
      )}
      

      </div>
    
  );
}
