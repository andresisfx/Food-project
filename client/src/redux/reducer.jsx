import {GET_RECIPES,SEARCH_BAR,GET_DIETS,FILTER_DIET} from "./actions"

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
            allRecipesCopy:action.payload
            
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
     
    const dietName = action.payload.toLowerCase();
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
   
        default:
        return {
        ...state
       } 
   }
  
}

export default rootReducer;