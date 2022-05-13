import style from './Card.module.css'


export function Card({name, image,weight,temperament,keys,bred_for}) {
    return (
       <div className={style.hover}>
            <li key={keys} className={style.cardStyle}>
            
            <img className={style.img} src={image} alt="not found" />

            <div className={style.text}>{name}</div>
            <div className={style.text1}> Peso(Min-Max): {weight}</div>
            <div className={style.text2}>Temperamento: {temperament}</div>
             <div className={style.text1}> {bred_for? `Criado para: ${bred_for}`:''}</div>
            
            
            </li>
            </div>
           
        
    )
}
