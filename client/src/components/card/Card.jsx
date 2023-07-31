import React from 'react'
import style from "./Card.module.css"
import { Link } from 'react-router-dom'

function Card({name,image,id,diets,Diets}) {
 
  return (
    <Link to={`/detail/${id}`}>
   <div className={style.cont}>
     <div className={style.title}>
      <h1>Id: {id}</h1>
      <h2>Name: {name}</h2>
      <h4>Diets type:
      <ul>
      {Array.isArray(diets) ? diets.map((diet) =>
       <li key={diet.name}>{diet.name}</li>)
      :<li>Diets information not available</li>
          }
      </ul>
      </h4>
     </div>
    
     <div >
      <img src={image} alt={name} />
     </div>
   </div>
   </Link>
  )
}

export default Card