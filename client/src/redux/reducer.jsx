import {GET_RECIPES,SEARCH_BAR,GET_DIETS} from "./actions"

let initialState = {
    allRecipes:[],
    allDiets:[],
    errorState:"error"
}

function rootReducer (state = initialState,action){
   switch (action.type) {
    case GET_RECIPES:
        return{
            ...state,
            allRecipes:action.payload
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
      
    
        default:
        return {
        ...state
       }
   }

}

export default rootReducer;