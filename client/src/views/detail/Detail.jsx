import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'



function Detail() {
const {id}= useParams()
const [recipe,setRecipe]= useState({})
const [errors,setErrors]= useState(null) 
const [loading,setLoading] = useState(true)


  useEffect(()=>{
    const getDetail=async()=>{
      try {
        if(id){
        const response = await axios.get(`http://localhost:3001/recipes/${id}`)
        const recipeId = response.data
         setRecipe(recipeId)
         setLoading(false)
        }
      } catch (error) {
        setErrors(error.message)
        setLoading(false)
      }
    }
    getDetail()
  },[id])

 console.log(recipe)
 if(Object.keys(recipe).length === 0){
  return <div><h1>Detail loading...</h1></div>
 }
  if(loading){
    return <div><h1>LOADING</h1></div>
  }
  if(errors){
    return <div>Error: {errors}</div>
  }
  return (
    <div>
      <img src={recipe[0].image} alt={recipe.name}  />
      <h2>Id:  </h2>
      <h3> {recipe[0].id}</h3>
      <h2>Healthscore: </h2>
      <h3>{recipe[0].healthScore}</h3>
      <h2>Name:</h2>
      <h2> {recipe[0].name}</h2>
      <h3>Summary of dish: </h3>
      <h4>{recipe[0].summaryOfDish}</h4>
      <div>
        <h3>Instructions:</h3>
      <ol>
      {recipe[0].stepByStep.length?recipe[0].stepByStep.map((step)=><li key={step}>{step}</li>):<h3>Instructions not avaliable</h3>}
      </ol>
      </div>
      <div>
        <h3>Diets:</h3>
      <ul> {Array.isArray(recipe[0].diets)?recipe[0].diets.map((diet)=><li key={recipe[0].diets}>{diet}</li>):<li>Diets not avaliable</li>}</ul>
      </div>
    </div>
  )
}

export default Detail
