import {GET_RECIPES,SEARCH_BAR,GET_DIETS,FILTER_DIET,FILTER_CREATED, CLEAN_FILTER, FILTER_API, FILTER_ALPHABETIC, FILTER_SCORE} from "./actions"

let initialState = {
    allRecipes:[],
    allRecipesCopy:[],
    allDiets:[],
    errorState:"error"
}

function rootReducer (state = initialState,action){
   switch (action.type) {
    case GET_RECIPES: 
        return{ 
            ...state,
            allRecipes:action.payload,
            allRecipesCopy:JSON.parse(JSON.stringify(action.payload)),
            recipesCopy2:JSON.parse(JSON.stringify(action.payload)),
            recipesCopy3:JSON.parse(JSON.stringify(action.payload)),
            recipesCopyForAll:JSON.parse(JSON.stringify(action.payload)),
            recipesCopy4:JSON.parse(JSON.stringify(action.payload))
            
        }
   

    case SEARCH_BAR:
        
        return {
            ...state,
            allRecipes:action.payload
        }
    case GET_DIETS:
        return {
            ...state,
         allDiets:action.payload
        }
    case FILTER_DIET:
     
    const dietName = action.payload;
    let filterOne = [];
  
    if (action.payload === "none") {
      filterOne = state.allRecipesCopy;
    } else {
      filterOne = state.allRecipesCopy.filter((recipe) => {
        if (Array.isArray(recipe.diets)) {
          return recipe.diets.some((diet) => diet.name === dietName);
        }
       
      });
    }
    return{
        ...state,
        allRecipes:filterOne
    } 
    case FILTER_CREATED:
          
        return{
            ...state,
            allRecipes: state.allRecipesCopy.filter(recipe=>recipe.hasOwnProperty("createdDb"))
        }

    case CLEAN_FILTER:
      return{
        ...state,
        allRecipes:state.recipesCopyForAll
      } 
    case FILTER_API:
      return{
        ...state,
        allRecipes: state.recipesCopy3.filter(recipe=>!recipe.hasOwnProperty("createdDb"))
      }     
    case FILTER_ALPHABETIC:
      const filteredRec=[]
      action.payload==="A"?filteredRec=[...state.allRecipesCopy].sort((a,b)=>a.name.toLowerCase().localeCompare(b.name.toLowerCase())):
      filteredRec=[...state.allRecipesCopy].sort((a,b)=>b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
      return{
        ...state,
        allRecipes:filteredRec
      }
  
    case FILTER_SCORE:                                                             
      const scoreFiltered= action.payload==="up"? [...state.allRecipesCopy].sort((a,b)=>a.healthScore-b.healthScore):
      [...state.allRecipesCopy].sort((a,b)=>b.healthScore-a.healthScore)
      return{
        ...state,
        allRecipes:scoreFiltered
      }         
        default:
        return {
        ...state
       } 
   }
  
}

export default rootReducer;