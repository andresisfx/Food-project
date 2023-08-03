import React, { useState } from 'react'
import { useEffect } from 'react'
import {  cleanFiler, filterApi, filterByDiet, filterCreated, getDiets, getRecipes } from '../../redux/actions'
import {useDispatch,useSelector} from "react-redux"
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';
import { v4 as uuidv4 } from 'uuid'

function Home() { 

  const recipes = useSelector((state)=> state.allRecipes);
  
 
  
  const diets= useSelector((state)=> state.allDiets)
 
  const dispatch = useDispatch();
 console.log(recipes)
 useEffect  (()=>{
  dispatch(getRecipes())
  dispatch(getDiets())
  
  console.log('useEffect: Home mounted')
 
 },[])

   const [selectedDiet,setSelectedDiet]=useState("none")
    
   const handleSelectChange=(event)=>{
    const dietName=event.target.value
    setSelectedDiet(dietName)
     dispatch(filterByDiet(dietName))
   }
   
 

   const handleCreatedChange =()=>{
       dispatch(filterCreated())
   }
   const handleCleanFilterchange=()=>{
      dispatch(cleanFiler())
   }
   const handleApiFilter=()=>{
    dispatch(filterApi())
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
        <button onClick={()=>handleCreatedChange()}>Creted recipes</button>
      </div>
      <div>
        <button onClick={()=>handleApiFilter()}>Recipes from app</button>
      </div>
      <div>
      <Container recipes={recipes}/>
      </div>
    </div>
  )
}

export default Home