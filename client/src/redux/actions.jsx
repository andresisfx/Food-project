import axios from "axios"

export const GET_RECIPES = "GET_RECIPES"
export const GET_RECIPESID ="GET_RECIPESID"
export const GET_DIETS = "GET_DIETS"
export const SEARCH_BAR = "SEARCH_BAR"
export const CHANGE_ERROR_STATE ="CHANGE_ERROR_STATE"
export const FILTER_DIET="FILTER_DIET"


 export  function getRecipes (){
    return async function(dispatch){
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        const recipes = response.data
        const normalizeDiets=(recipes)=> {
         return recipes.map((recipe) => ({
           ...recipe,
           diets: recipe.Diets || recipe.diets,
         }));
       }
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
      dispatch({type:SEARCH_BAR,payload:recipeName})
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
 
 
 

 

      

 