import React from 'react'
import Card from '../card/Card'
import style from "./Container.module.css"

function Container({recipes}) {
 
  return (
    <div className={style.container}>
     {recipes.map((rec)=>{
      return(
      <Card
      key={rec.id}
      id={rec.id}
      name={rec.name}
      diets={rec.diets}
      image={rec.image}
      />
     )})}
    </div>
  )
}

export default Container