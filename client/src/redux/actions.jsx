import axios from "axios"

export const GET_RECIPES = "GET_RECIPES"
export const GET_RECIPESID ="GET_RECIPESID"
export const GET_DIETS = "GET_DIETS"
export const SEARCH_BAR = "SEARCH_BAR"
export const CHANGE_ERROR_STATE ="CHANGE_ERROR_STATE"
export const FILTER_DIET="FILTER_DIET"
export const FILTER_CREATED = "FILTER_CREATED"
export const FILTER_API="FILTER_API"
export const CLEAN_FILTER="CLEAN_FILTER"
export const FILTER_A_Z="FILTER_A_Z"
export const FILTER_Z_A="FILTER_Z_A"
export const FILTER_SCORE="FILTER_SCORE"


const normalizeDiets=(recipes)=> {
  return recipes.map((recipe) => ({
    ...recipe,
    diets: recipe.Diets || recipe.diets,
  }));
}

 export  function getRecipes (){
    return async function(dispatch){
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        const recipes = response.data
       
       const standarRecipe = normalizeDiets(recipes)
        dispatch({
            type:GET_RECIPES,
            payload:standarRecipe
        })
      } catch (error) {
        alert({error:error.message})
      }  
    }
 }

 export function searchName (name){
 
  return async function (dispatch){
    try {
      const response = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      const recipeName = response.data
      const standarRecipe = normalizeDiets(recipeName)
      dispatch({type:SEARCH_BAR,payload:standarRecipe})
    } catch (error) {
      alert({error:error.message})
    }
  
   
  }
 }




 export function getDiets (){
  return async function (dispatch){
    try {
      const response = await axios.get("http://localhost:3001/diets");
      const diets = response.data
     
      dispatch({
        type:GET_DIETS,
        payload:diets
      })
    } catch (error) {
      alert({error:error.message})
    }
  }
 }
 
 export const filterByDiet =(diet)=>({type:FILTER_DIET,payload:diet})

 export const filterCreated =(recipes)=>({type:FILTER_CREATED,payload:recipes})

 export const filterScore =(orientation)=>({type:FILTER_SCORE,payload:orientation})
 
 export const cleanFiler=()=>({type:CLEAN_FILTER})
 export const filterApi=()=>({type:FILTER_API})
 export const filterAtoZ=()=>({type:FILTER_A_Z})
 export const filterZtoA=()=>({type:FILTER_Z_A})
 
 

 

      

 