import {GET_RECIPES} from "./actions"

let initialState = {
    allRecipes:[],

}

function rootReducer (state = initialState,action){
   switch (action.type) {
    case GET_RECIPES:
        return{
            ...state,
            allRecipes:action.payload
        }
     default:
        return {
        ...state
       }
       
   }
}

export default rootReducer;