import React from 'react'
import Card from '../card/Card'

function Container(recipes) {

  return (
    <div className={style.container}>
     {recipes.map((rec)=>{
      <Card
      key={rec.id}
      name={rec.name}
      diet={rec.diets}
      image={rec.image}
      />
     })}
    </div>
  )
}

export default Container