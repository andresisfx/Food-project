import React, { useState } from 'react'
import { useEffect } from 'react'
import { cleanFiler, filterApi, filterAtoZ, filterByDiet, filterCreated, filterScore, filterZtoA, getDiets, getRecipes } from '../../redux/actions'
import {useDispatch,useSelector} from "react-redux"
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';
import { v4 as uuidv4 } from 'uuid'

function Home() { 

  const recipes = useSelector((state)=> state.allRecipes);
  const diets= useSelector((state)=> state.allDiets)
  const [selectedDiet,setSelectedDiet]=useState("none")
  const [currentPage,setCurrentPage]=useState(0)
  const itemsPerPage = 10
  const [item,setItem]=useState([...recipes].splice(0,itemsPerPage))
 
  const dispatch = useDispatch();
 console.log(recipes)
 useEffect  (()=>{
  dispatch(getRecipes())
  dispatch(getDiets())
  
  console.log('useEffect: Home mounted')
 
 },[dispatch])
 
 useEffect(()=>{
   setItem([...recipes].splice(0,itemsPerPage))
 },[[recipes]])

 const nextPage=()=>{
  const next_page= currentPage+1;
  const firstIndex= next_page*itemsPerPage

  setItem([...recipes].splice(firstIndex,itemsPerPage))
  setCurrentPage(next_page)
 }
    
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
   const handleAtoZ=()=>{
    dispatch(filterAtoZ())
   }
   const handleZtoA=()=>{
    dispatch(filterZtoA())
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
        <button onClick={()=>handleCreatedChange()}>Creted recipes</button>
      </div>
      <div>
        <button onClick={()=>handleApiFilter()}>Recipes from app</button>
      </div>
      <div>
        <label htmlFor="">Sort in alphabetical order</label>
        <button onClick={()=>handleAtoZ()}>A to Z</button>
        <button onClick={()=>handleZtoA()}>Z to A</button>
      </div>
      <div>
        <label >Order recipe by healthscore</label>
        <select name="" onChange={(event)=>handleScoreChange(event.target.value)} >
        <option value="up">From least healthy to healthiest</option>
        <option value="down">From healthiest to least healthy</option>
        </select>
      </div>
      <div>
      <Container recipes={recipes}/>
      </div>
    </div> 
  )
}

export default Home