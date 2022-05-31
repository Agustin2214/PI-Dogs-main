import {CgSpinner} from 'react-icons/cg'
import style from './Loading.module.css'

export function Loading() {
    return (
        <div className={style.loading}>
            
            <CgSpinner className={style.loader} size={100}/>
               <p className={style.text1}>Loading..</p> 
        </div>
    )
}
