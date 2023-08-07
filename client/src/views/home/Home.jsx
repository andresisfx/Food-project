import React, { useState } from 'react'
import { useEffect } from 'react'
import { cleanFiler,  alphabeticFilter, filterByDiet, filterOrigin, filterScore,  getDiets, getRecipes, paginate } from '../../redux/actions'
import {useDispatch,useSelector} from "react-redux"
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';
import { v4 as uuidv4 } from 'uuid'

function Home() { 

  const recipes = useSelector((state)=> state.allRecipes);
  const paginatedRecipes = useSelector((state)=> state.paginatedRecipes);
  const recipesFiltered = useSelector((state)=> state.recipesFiltered);
  const filter = useSelector((state)=> state.filter);
  const diets= useSelector((state)=> state.allDiets)
  const [selectedDiet,setSelectedDiet]=useState("none")

 
  const dispatch = useDispatch();
 console.log(paginatedRecipes)
 useEffect  (()=>{
  dispatch(getRecipes())
  dispatch(getDiets())
  
  console.log('useEffect: Home mounted')
 
 },[])
 console.log(filter)



 const handlePaginate=(order)=>{
  dispatch(paginate(order))
 }
    
   const handleSelectChange=(event)=>{
    const dietName=event.target.value
    setSelectedDiet(dietName)
     dispatch(filterByDiet(dietName))
   }
   
   const handleOriginRecipes =(origin)=>{
       dispatch(filterOrigin(origin))
   }
   const handleCleanFilterchange=()=>{
      dispatch(cleanFiler())
   }
  
   const handleAlphabetical=(orientation)=>{
    dispatch(alphabeticFilter(orientation))
   }
   
   const handleScoreChange=(orientation)=>{
     dispatch(filterScore(orientation))
   }
  
  return (
    <div> 
      <div>
        <button onClick={()=>handleCleanFilterchange()} >All recipes</button>
        
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        <label htmlFor="">Select a recipe according the diet type </label>
        <select onChange={handleSelectChange} value={selectedDiet}>
          <option value="none">All diets</option>
          {diets?diets.map((diet)=><option key={uuidv4()} value={diet.name}>{diet.name}</option>):null }
        </select>
      </div>
      <div>
        <label htmlFor="">Origin recipes</label>
        <select value=""onChange={(event)=>handleOriginRecipes(event.target.value)}>
        <option value="">Select an option</option>        
        <option value="created">Recipes creted  by users</option>
        <option value="api">Preexistent Recipes</option>
        </select> 
      </div>
      <div>
        <label htmlFor="">Sort in alphabetical order</label>
        <select value="" onChange={(event)=>handleAlphabetical(event.target.value)}>
        <option value="">Select an option</option>
        <option value="A">A to Z</option>
        <option value="Z">Z to A</option>
        </select>
      </div>
      <div>
        <label >Order recipe by healthscore</label>
        <select value="" onChange={(event)=>handleScoreChange(event.target.value)} >
        <option value="">Select an option</option>
        <option value="up">From least healthy to healthiest</option>
        <option value="down">From healthiest to least healthy</option>
        </select>
        <button vlaue="prev" onClick={(e)=>handlePaginate(e.target.value)}>prev-page</button><button value="next" onClick={(e)=>handlePaginate(e.target.value)}>next-Page</button>
      </div>
      
      <div>
      <Container recipes={filter?recipesFiltered:paginatedRecipes}/>
      </div>
    </div> 
  )
}

export default Home