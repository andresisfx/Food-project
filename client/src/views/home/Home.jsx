import React, { useState } from 'react'
import { useEffect } from 'react'
import { cleanFiler,  alphabeticFilter, filterByDiet, filterOrigin, filterScore,  getDiets, getRecipes } from '../../redux/actions'
import {useDispatch,useSelector} from "react-redux"
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';
import { v4 as uuidv4 } from 'uuid';
import style from "./Home.module.css"

function Home() { 
  const items_per_page=10
  const recipes = useSelector((state)=> state.allRecipes);
  const recipesFiltered = useSelector((state)=> state.recipesFiltered);
  const filter = useSelector((state)=> state.filter);
  const diets= useSelector((state)=> state.allDiets)
  const [selectedDiet,setSelectedDiet]=useState("none")
  const [currentPage,setCurrentPage]=useState(0);
  const [items,setItems]=useState([...recipes].splice(0,items_per_page));
  const [itemsFiltered,setItemsFiltered]=useState([...recipesFiltered].splice(0,items_per_page));
  
 
  const dispatch = useDispatch();
 

 useEffect  (()=>{
  dispatch(getRecipes())
  dispatch(getDiets())
   setCurrentPage(0)
  
 
 },[])


      
  useEffect(()=>{
    
     setItems([...recipes].splice(0,items_per_page))
     setItemsFiltered([...recipesFiltered].splice(0,items_per_page))
     setCurrentPage(0)
  },[recipes,recipesFiltered])

  const handlePrev=()=>{
    const prev_page = currentPage -1;
    const first_index =prev_page * items_per_page
    if(prev_page<0)return
    if(filter){
      setItemsFiltered([...recipesFiltered].splice(first_index,items_per_page))
      setCurrentPage(prev_page)
    }
    else{  
      setItems([...recipes].splice(first_index,items_per_page))
      setCurrentPage(prev_page)
    }
  }
  const handleNext=()=>{
     const next_page = currentPage + 1;
    const first_index = next_page * items_per_page
    if(filter){
       if(first_index>=recipesFiltered.length){return}
       else{
        setItemsFiltered([...recipesFiltered].splice(first_index,items_per_page))
        setCurrentPage(next_page)  
       }
    }
    else{
      if(first_index>=recipes.length)return
      setItems([...recipes].splice(first_index,items_per_page))
      setCurrentPage(next_page)
    }
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
    console.log(orientation)
    dispatch(alphabeticFilter(orientation))
   }
   
   const handleScoreChange=(orientation)=>{
     dispatch(filterScore(orientation))
   }
  
  return (
    <div className={style.main}> 
     <div>
      <div>
        <button onClick={()=>handleCleanFilterchange()} >All recipes</button>
      </div>
      <div className={style.itemHome}>
        <SearchBar/>
      </div>
      <div className={style.itemHome}>
        <label htmlFor="">Select a recipe according the diet type </label>
        <select onChange={handleSelectChange} value={selectedDiet}>
          <option value="none">All diets</option>
          {diets?diets.map((diet)=><option key={uuidv4()} value={diet.name}>{diet.name}</option>):null }
        </select>
      </div>
      <div className={style.itemHome}>
        <label htmlFor="">Origin recipes</label>
        <select value=""onChange={(event)=>handleOriginRecipes(event.target.value)}>
        <option value="">Select an option</option>        
        <option value="created">Recipes creted  by users</option>
        <option value="api">Preexistent Recipes</option>
        </select> 
      </div>
      <div className={style.itemHome}>
        <label htmlFor="">Sort in alphabetical order</label>
        <select value="" onChange={(event)=>handleAlphabetical(event.target.value)}>
        <option value="">Select an option</option>
        <option value="A">A to Z</option>
        <option value="Z">Z to A</option>
        </select>
      </div>
      <div className={style.itemHome}>
        <label >Order recipe by healthscore</label>
        <select value="" onChange={(event)=>handleScoreChange(event.target.value)} >
        <option value="">Select an option</option>
        <option value="up">From least healthy to healthiest</option>
        <option value="down">From healthiest to least healthy</option>
        </select>
        <button  onClick={()=>handlePrev()}>prev-page</button><button onClick={()=>handleNext()}>next-Page</button>
      </div>
     </div> 
      <div>
      <Container recipes={filter?itemsFiltered:items}/>
      </div>
    </div> 
  )
}

export default Home