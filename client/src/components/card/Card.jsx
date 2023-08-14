import React from 'react'
import style from "./Card.module.css"
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
function Card({name,image,id,diets}) {
 
  return (
    <Link className={style.link} to={`/detail/${id}`}>
   <div className={style.cont}>
     <div className={style.title}>
      <h1 className={style.text}>ID: {id}</h1>
      <h2 className={style.tex}>Name: {name}</h2>
      <h4 className={style.tex}>Diet type:
      <ol >
      {Array.isArray(diets) ? diets.map((diet) =>
       <li key={uuidv4()}>{diet.name}</li>)
      :<li>Diets information not available</li>
          }
      </ol>
      </h4>
      <div >
      </div>
      <img className={style.image} src={image} alt={name} />
     </div>
    
     
     
   </div>
   </Link>
  )
}

export default Card