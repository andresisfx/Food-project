import React, { useState } from 'react'
import { useEffect } from 'react'
import {  filterByDiet, getDiets, getRecipes } from '../../redux/actions'
import {useDispatch,useSelector} from "react-redux"
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';


function Home() {

  const recipes = useSelector((state)=> state.allRecipes);
  const diets= useSelector((state)=> state.allDiets)
  const [reloadRecipes,setReloadRecipes] = useState(false)
  const dispatch = useDispatch();
 console.log(recipes)
 useEffect  (()=>{
  dispatch(getRecipes())
  dispatch(getDiets())
  setReloadRecipes(false)
  console.log('useEffect: Home mounted')
 
 },[reloadRecipes])

   const [selectedDiet,setSelectedDiet]=useState("none")
    
   const handleSelectChange=(event)=>{
    const dietName=event.target.value
    setSelectedDiet(dietName)
     dispatch(filterByDiet(dietName))
   }
   

  return (
    <div> 
      <div>
        <button onClick={()=>setReloadRecipes(true)}>All recipes</button>
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        <label htmlFor="">Select a recipe according the diet type </label>
        <select onChange={handleSelectChange} value={selectedDiet}>
          <option value="none">All diets</option>
          {diets?diets.map((diet)=><option key={diet.name} value={diet.name}>{diet.name}</option>):null }
        </select>
      </div>
      <div>
      <Container recipes={recipes}/>
      </div>
    </div>
  )
}

export default Home