import axios from "axios"
const GET_RECIPES = "GET_RECIPES"
const GET_RECIPESID ="GET_RECIPESID"
const GET_RECIPESNAME = "GET_RECIPESNAME"
const GET_DIETS = "GET_DIETS"


 export  function getRecipes (){
    return async function(dispatch){
      try {
        const recipes = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=5d3cd5aee1904f55a402ec01d5b3380b&addRecipeInformation=true&number=100").data;
    
        dispatch({
            type:GET_RECIPES,
            payload:recipes
        })
      } catch (error) {
        alert({error:error.message})
      }  
    }
 }

 export function getDiets (){
  return async function (dispatch){
    try {
      const diets = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=5d3cd5aee1904f55a402ec01d5b3380b&addRecipeInformation=true&number=100").data
      dispatch({
        type:GET_DIETS,
        payload:response
      })
    } catch (error) {
      
    }
  }
 }

      

 